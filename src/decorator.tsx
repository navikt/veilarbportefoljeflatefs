import React, {useCallback, useEffect, useState} from 'react';
import NAVSPA from '@navikt/navspa';
import {DecoratorProps, EnhetDisplay, FnrDisplay} from './utils/types/decorator-props';
import {useDispatch} from 'react-redux';
import {oppdaterValgtEnhet} from './ducks/valgt-enhet';
import {useEnhetSelector} from './hooks/redux/use-enhet-selector';
import {fjernBrukerIKontekst, hentBrukerIKontekst} from './middleware/api';

const RESET_VALUE = '\u0000';
const InternflateDecorator = NAVSPA.importer<DecoratorProps>('internarbeidsflatefs');

function getConfig(enhet: string | null, settValgtEnhet: (enhet) => void): DecoratorProps {
    return {
        appname: 'Arbeidsrettet oppfølging',
        fnr: {
            initialValue: RESET_VALUE,
            display: FnrDisplay.SOKEFELT,
            ignoreWsEvents: true,
            onChange: value => {
                if (value) {
                    window.location.pathname = `veilarbpersonflatefs/${value}`;
                }
            }
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

    const config = useCallback(getConfig, [enhetId, velgEnhet])(enhetId, velgEnhet);

    return (
        <InternflateDecorator
            {...config}
            fnr={{
                display: FnrDisplay.SOKEFELT,
                initialValue: brukerIKontekst,
                ignoreWsEvents: true,
                onChange: () => void 0
            }}
        />
    );
}
