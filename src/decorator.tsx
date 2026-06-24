import {useEffect, useLayoutEffect, useRef} from 'react';
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
                ref?: React.Ref<HTMLElement>;
                'app-name': string;
                enhet?: string;
                environment: string;
                'fnr-sync-mode'?: 'sync' | 'writeOnly' | 'ignore';
                proxy?: string;
                'show-enheter'?: boolean;
                'show-search-area'?: boolean;
                'url-format': 'LOCAL' | 'NAV_NO' | 'ANSATT';
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

export function Decorator() {
    const dispatch = useAppDispatch();
    const enhetId = useEnhetSelector();
    const brukerIKontekst = useBrukerIKontekstSelector();
    const decoratorRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const el = decoratorRef.current;
        if (!el) return;

        const onEnhetChanged = (e: Event) => {
            const enhet = (e as CustomEvent<{enhet?: string | null}>).detail.enhet;
            if (enhet) {
                dispatch(oppdaterValgtEnhet(enhet));
            }
        };

        const onFnrChanged = (e: Event) => {
            const fnr = (e as CustomEvent<{fnr?: string | null}>).detail.fnr;
            if (fnr) {
                window.location.href = getVeilarbpersonflateBasePath();
            }
        };

        el.addEventListener('enhet-changed', onEnhetChanged);
        el.addEventListener('fnr-changed', onFnrChanged);
        return () => {
            el.removeEventListener('enhet-changed', onEnhetChanged);
            el.removeEventListener('fnr-changed', onFnrChanged);
        };
    }, [dispatch]);

    useEffect(() => {
        if (brukerIKontekst && !window.location.href.includes('/tilbake')) {
            dispatch(fjernBrukerIKontekst());
        }
    }, [brukerIKontekst, dispatch]);

    const urlFormat = getEnv().ingressType === 'ansatt' ? 'ANSATT' : 'NAV_NO';

    return (
        <internarbeidsflate-decorator
            ref={decoratorRef}
            app-name="Arbeidsrettet oppfølging"
            enhet={enhetId ?? undefined}
            environment={getDecoratorEnv()}
            fnr-sync-mode="writeOnly"
            proxy="/modiacontextholder"
            show-enheter
            show-search-area
            url-format={urlFormat}
        />
    );
}
