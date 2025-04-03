import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import NAVSPA from '@navikt/navspa';
import {oppdaterValgtEnhet} from './ducks/valgt-enhet';
import {useEnhetSelector} from './hooks/redux/use-enhet-selector';
import {useBrukerIKontekstSelector} from './hooks/redux/use-bruker-i-kontekst-selector';
import {EnvType, getEnv, getVeilarbpersonflateBasePath} from './utils/url-utils';
import {fjernBrukerIKontekst} from './ducks/bruker-i-kontekst';
import {DecoratorPropsV3, Environment} from './utils/types/decorator-props-v3';

const InternflateDecorator = NAVSPA.importer<DecoratorPropsV3>('internarbeidsflate-decorator-v3');

function getDecoratorEnv(): Environment {
    const env = getEnv();
    if (env.type === EnvType.prod) {
        return 'prod';
    } else {
        return 'q2';
    }
}

function getConfig(enhet: string | null, settValgtEnhet: (enhet) => void): DecoratorPropsV3 {
    return {
        appName: 'Arbeidsrettet oppfølging',
        onFnrChanged: value => {
            if (value) {
                window.location.href = getVeilarbpersonflateBasePath();
            }
        },
        fnrSyncMode: 'writeOnly',
        showSearchArea: true,
        enhet: enhet ?? undefined,
        showEnheter: true,
        onEnhetChanged: value => {
            if (value) {
                settValgtEnhet(value);
            }
        },
        proxy: '/modiacontextholder',
        environment: getDecoratorEnv(),
        showHotkeys: false,
        urlFormat: getEnv().ingressType === 'ansatt' ? 'ANSATT' : 'NAV_NO'
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
