import React, {useEffect} from 'react';
import NAVSPA from '@navikt/navspa';
import {DecoratorProps, EnhetDisplay, FnrDisplay} from './utils/types/decorator-props';
import {useDispatch} from 'react-redux';
import {oppdaterValgtEnhet} from './ducks/valgt-enhet';
import {useEnhetSelector} from './hooks/redux/use-enhet-selector';
import {useBrukerIKontekstSelector} from './hooks/redux/use-bruker-i-kontekst-selector';
import {erDev} from './utils/url-utils';
import {fjernBrukerIKontekst} from './ducks/bruker-i-kontekst';

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
                    window.location.href = erDev()
                        ? 'https://veilarbpersonflate.intern.dev.nav.no'
                        : 'https://veilarbpersonflate.intern.nav.no';
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
    const brukerIKontekst = useBrukerIKontekstSelector();

    useEffect(() => {
        if (brukerIKontekst && !window.location.href.includes('/tilbake')) {
            dispatch(fjernBrukerIKontekst());
        }
    }, [brukerIKontekst, dispatch]);

    function velgEnhet(enhet: string) {
        dispatch(oppdaterValgtEnhet(enhet));
    }

    const config = getConfig(enhetId, velgEnhet);

    return <InternflateDecorator {...config} />;
}
