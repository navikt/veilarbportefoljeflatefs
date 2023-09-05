import React, {useEffect, useState} from 'react';
import NAVSPA from '@navikt/navspa';
import {DecoratorProps, EnhetDisplay, FnrDisplay} from './utils/types/decorator-props';
import {useDispatch} from 'react-redux';
import {oppdaterValgtEnhet} from './ducks/valgt-enhet';
import {useEnhetSelector} from './hooks/redux/use-enhet-selector';
import {fjernBrukerIKontekst, hentBrukerIKontekst} from './middleware/api';
import {erDev} from './utils/url-utils';

const RESET_VALUE = '\u0000';
const InternflateDecorator = NAVSPA.importer<DecoratorProps>('internarbeidsflatefs');
function getConfig(enhet: string | null, settValgtEnhet: (enhet) => void): DecoratorProps {
    return {
        appname: 'Arbeidsrettet oppfølging',
        fnr: {
            initialValue: RESET_VALUE,
            display: FnrDisplay.SOKEFELT,
            ignoreWsEvents: true,
            onChange: () => {}
        },
        toggles: {
            visVeileder: true
        },
        enhet: {
            initialValue: enhet,
            display: EnhetDisplay.ENHET_VALG,
            onChange: value => {
                if (value) {
                    settValgtEnhet(value);
                }
            }
        },
        useProxy: true
    };
}

export function Decorator() {
    const dispatch = useDispatch();
    const enhetId = useEnhetSelector();
    const [brukerIKontekst, setBrukerIKontekst] = useState<string | null>(null);
    const [ignorerDecoratorOnChange, setIgnorerDecoratorOnChange] = useState(true);

    useEffect(() => {
        if (window.location.href.includes('/tilbake')) {
            hentBrukerIKontekst().then(setBrukerIKontekst);
        } else {
            fjernBrukerIKontekst();
        }
    }, []);

    function velgEnhet(enhet: string) {
        dispatch(oppdaterValgtEnhet(enhet));
    }

    const config = getConfig(enhetId, velgEnhet);

    return (
        <InternflateDecorator
            {...config}
            fnr={{
                initialValue: brukerIKontekst,
                display: FnrDisplay.SOKEFELT,
                ignoreWsEvents: true,
                onChange: () => {
                    // Denne onChange-funksjonen kalles hver gang fnr endres i kontekst
                    // også første gang det settes gjennom initialValue.
                    // For å unngå å trigge hopp når applikasjonen mountes
                    // må vi gjøre en sjekk her. Dvs. vi ønsker bare å hoppe
                    // når veileder aktivt søker opp en person gjennom søkefeltet.
                    if (brukerIKontekst && ignorerDecoratorOnChange) {
                        setIgnorerDecoratorOnChange(false);
                    } else {
                        window.location.href = erDev()
                            ? 'https://veilarbpersonflate.intern.dev.nav.no'
                            : 'https://veilarbpersonflate.intern.nav.no';
                    }
                }
            }}
        />
    );
}
