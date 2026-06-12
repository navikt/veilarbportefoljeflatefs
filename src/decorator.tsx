import {useEffect} from 'react';
import {useEnhetSelector} from './hooks/redux/use-enhet-selector';
import {useBrukerIKontekstSelector} from './hooks/redux/use-bruker-i-kontekst-selector';
import {EnvType, getEnv, getVeilarbpersonflateBasePath} from './utils/url-utils';
import {fjernBrukerIKontekst} from './ducks/bruker-i-kontekst';
import {oppdaterValgtEnhet} from './ducks/valgt-enhet';
import {useAppDispatch} from './hooks/redux/use-app-dispatch';

type Environment = 'q0' | 'q1' | 'q2' | 'q3' | 'q4' | 'prod' | 'local' | 'mock';

declare module 'react' {
    namespace JSX {
        interface IntrinsicElements {
            'internarbeidsflate-decorator': {
                'app-name': string;
                enhet?: string;
                environment: string;
                'fnr-sync-mode'?: 'sync' | 'writeOnly' | 'ignore';
                proxy?: string;
                'show-enheter'?: boolean;
                'show-search-area'?: boolean;
                'url-format': 'LOCAL' | 'NAV_NO' | 'ANSATT';
                onEnhetChanged?: (event: CustomEvent<{enhet?: string | null}>) => void;
                onFnrChanged?: (event: CustomEvent<{fnr?: string | null}>) => void;
            };
        }
    }
}

function getDecoratorEnv(): Environment {
    const env = getEnv();
    if (env.type === EnvType.prod) {
        return 'prod';
    } else if (env.type === EnvType.local) {
        return 'local';
    } else {
        return 'q2';
    }
}

function handterFnrEndret(event: CustomEvent<{fnr?: string | null}>) {
    const fnr = event.detail.fnr;
    if (fnr) {
        window.location.href = getVeilarbpersonflateBasePath();
    }
}

export function Decorator() {
    const dispatch = useAppDispatch();
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

    function handterEnhetEndret(event: CustomEvent<{enhet?: string | null}>) {
        const enhet = event.detail.enhet;
        if (enhet) {
            velgEnhet(enhet);
        }
    }

    const urlFormat = getEnv().ingressType === 'ansatt' ? 'ANSATT' : 'NAV_NO';

    return (
        <internarbeidsflate-decorator
            app-name="Arbeidsrettet oppfølging"
            enhet={enhetId ?? undefined}
            environment={getDecoratorEnv()}
            fnr-sync-mode="writeOnly"
            proxy="/modiacontextholder"
            show-enheter
            show-search-area
            url-format={urlFormat}
            onEnhetChanged={handterEnhetEndret}
            onFnrChanged={handterFnrEndret}
        />
    );
}
