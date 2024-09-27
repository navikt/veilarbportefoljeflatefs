import React, {useEffect} from 'react';
import NAVSPA from '@navikt/navspa';
import {useDispatch} from 'react-redux';
import {oppdaterValgtEnhet} from './ducks/valgt-enhet';
import {useEnhetSelector} from './hooks/redux/use-enhet-selector';
import {useBrukerIKontekstSelector} from './hooks/redux/use-bruker-i-kontekst-selector';
import {EnvType, getEnv, getVeilarbpersonflateBasePath} from './utils/url-utils';
import {fjernBrukerIKontekst} from './ducks/bruker-i-kontekst';
import {DecoratorPropsV3, Environment} from './utils/types/decorator-props-v3';
import {useFeatureSelector} from './hooks/redux/use-feature-selector';
import {MIDLERTIDIG_FIKS_FNR_I_KONTEKST} from './konstanter';
import {store} from './application';

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

const onFnrChangedMedFeatureToggle = fnr => {
    /* Skildring av edge-case og kjende problem med denne fiksen.*/

    /* Oppførsel med fiks:
     *
     * Case: Berre ei open fane
     * Oppsummert: forventa oppførsel. Opning i ny fane: opnar ny fane og blir ståande på oversikten. Resten navigerer til brukarside.
     *
     * Case: To opne vindauge med oversikten, begge er "heilt ferske". Fane 1 er den du står på, fane 2 er open i bakgrunnen/anna vindauge.
     *   1) Du navigerer direkte til person i den eine. -> Begge oversiktsfaner navigerer til personen.
     *   2) Du opnar ein person i ny fane. -> Fane 1 blir verande på oversikten, fane 2 navigerer til personen.
     *   3) Du søkar på ein person i personsøket. -> Begge oversiktsfaner navigerer til personen.
     * Oppsummert: Fane 1 har forventa oppførsel. Fane 2 navigerer til personen i alle tilfelle (i staden for å halde seg på oversikten i alle tilfelle).
     *
     * Case: To opne vindauge med oversikten. Fane 1 er den du står på, fane 2 har tidlegare opna brukar med ctrl+klikk
     *   1) Du navigerer direkte til person i den eine (frå fane 1). -> Fane navigerer til personen. Fane 2 forblir på oversikten, men får melding om endring av bruker i kontekst.
     *   2) Du opnar ein person i ny fane (frå fane 1). -> Fane 1 forblir på oversikten. Fane 2 forblir på oversikten, men får melding om endring av bruker i kontekst.
     *   3) Du søkar på ein person i personsøket (frå fane 1). -> Fane 1 navigerer til personen. Fane 2 forblir på oversikten, men får melding om endring av bruker i kontekst.
     * Oppsummert: Fane 1 har forventa oppførsel. Fane 2 får melding om endring av brukar i kontekst (og skulle helst ikkje hatt det).
     *
     *
     * Case: Søkar på same person ein rett før opna i ny fane
     *   - Opnar person i ny fane. Personnummeret dukkar opp i personsøk.
     *   - Trykkar søk. Ingenting skjer (anna enn at feltet vert tomt).
     *   - Skriv inn personnummer på nytt, prøvar å søke igjen. Skjer framleis ingenting.
     * Dette er eit edge-case vi visste om då vi valde fiksen. Vi trur ikkje det vil skje ofte, fiksen i sum er betre enn ingenting.
     *
     * */
    const fnrForSidenavigeringMidlertidigFiks = store.getState().fnrForSidenavigeringMidlertidigFiks.fnr;

    if (fnr) {
        if (fnr !== fnrForSidenavigeringMidlertidigFiks) {
            window.location.href = getVeilarbpersonflateBasePath();
        }
        return;
    }
};

export function Decorator() {
    const erMidlertidigFiksFnrIKontekstFeatureTogglePa = useFeatureSelector()(MIDLERTIDIG_FIKS_FNR_I_KONTEKST);

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

    if (erMidlertidigFiksFnrIKontekstFeatureTogglePa) {
        return <InternflateDecorator {...config} onFnrChanged={fnr => onFnrChangedMedFeatureToggle(fnr)} />;
    }
    return <InternflateDecorator {...config} />;
}
