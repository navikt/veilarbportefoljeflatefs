import * as React from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import './modal/feilmelding-brukere.less';
import {useFeatureSelector} from '../hooks/redux/use-feature-selector';
import {ALERTSTRIPE_FEILMELDING} from '../konstanter';

const AlertstripeTekniskeProblemer = () => {
    const erAlertstripeFeilmeldingFeatureTogglePa = useFeatureSelector()(ALERTSTRIPE_FEILMELDING);

    return erAlertstripeFeilmeldingFeatureTogglePa ? (
        <AlertStripe type="advarsel" className="stor-feil-modal">
            Vi har en varierende treghet i oversikten som gjør at det kan ta opptil et kvarter før tildelte brukere
            dukker opp i Min oversikt, og at filtre på dialog og aktiviteter oppdateres. Det vil også kunne gi
            feilmelding ved bruk av arbeidslista. Vi jobber med å finne løsning på problemet.
        </AlertStripe>
    ) : null;
};
export default AlertstripeTekniskeProblemer;
