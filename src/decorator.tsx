import React, {useEffect} from 'react';
import NAVSPA from '@navikt/navspa';
import {useDispatch, useSelector} from 'react-redux';
import {oppdaterValgtEnhet} from './ducks/valgt-enhet';
import {useEnhetSelector} from './hooks/redux/use-enhet-selector';
import {useBrukerIKontekstSelector} from './hooks/redux/use-bruker-i-kontekst-selector';
import {EnvType, getEnv, getVeilarbpersonflateBasePath} from './utils/url-utils';
import {fjernBrukerIKontekst} from './ducks/bruker-i-kontekst';
import {DecoratorPropsV3, Environment} from './utils/types/decorator-props-v3';
import {useFeatureSelector} from './hooks/redux/use-feature-selector';
import {MIDLERTIDIG_FIKS_FNR_I_KONTEKST} from './konstanter';
import {AppState} from './reducer';

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
        fnr: undefined,
        onFnrChanged: value => {
            if (value) {
                window.location.href = getVeilarbpersonflateBasePath();
            }
        },
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

const onFnrChangedMedFeatureToggle = (fnr, fnrForSidenavigeringMidlertidigFiks: string | null) => {
    /* TODO dokumenter smutthol/edge-case der ein søkar på brukar som allereie er i context */
    if (fnr) {
        if (fnr !== fnrForSidenavigeringMidlertidigFiks) {
            // eslint-disable-next-line no-alert
            const sendMegVidare = window.confirm(
                `onFnrChangedMedFeatureToggle: ulike fnr! 🎉 
                \nFnr: ${fnr}, fnr frå state: ${fnrForSidenavigeringMidlertidigFiks}
                \nDu blir sendt videre til ei anna side`
            );
            if (sendMegVidare) {
                window.location.href = getVeilarbpersonflateBasePath();
            }
            return;
        }
        // eslint-disable-next-line no-alert
        window.alert(
            `onFnrChangedMedFeatureToggle: like fnr 🎉
            \nFnr: ${fnr}, fnr frå state: ${fnrForSidenavigeringMidlertidigFiks}`
        );
    }
};

function getConfigMedFeatureToggle(
    enhet: string | null,
    settValgtEnhet: (enhet) => void,
    fnrForSidenavigeringMidlertidigFiks: string | null
): DecoratorPropsV3 {
    return {
        appName: 'Arbeidsrettet oppfølging',
        fnr: undefined,
        onFnrChanged: fnr => onFnrChangedMedFeatureToggle(fnr, fnrForSidenavigeringMidlertidigFiks),
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
    const erMidlertidigFiksFnrIKontekstFeatureTogglePa = useFeatureSelector()(MIDLERTIDIG_FIKS_FNR_I_KONTEKST);
    const fnrForSidenavigeringMidlertidigFiks = useSelector(
        (state: AppState) => state.fnrForSidenavigeringMidlertidigFiks.fnr
    );

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

    const configToggle = getConfigMedFeatureToggle(enhetId, velgEnhet, fnrForSidenavigeringMidlertidigFiks);
    const configVanlig = getConfig(enhetId, velgEnhet);
    const onFnrChangedToggle = fnr => onFnrChangedMedFeatureToggle(fnr, fnrForSidenavigeringMidlertidigFiks);

    const valgtConfig = erMidlertidigFiksFnrIKontekstFeatureTogglePa ? configToggle : configVanlig;

    if (erMidlertidigFiksFnrIKontekstFeatureTogglePa) {
        return <InternflateDecorator {...valgtConfig} onFnrChanged={value => onFnrChangedToggle(value)} />;
    }
    return <InternflateDecorator {...valgtConfig} />;
}
