import * as React from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import './modal/feilmelding-brukere.less';
import {useFeatureSelector} from '../hooks/redux/use-feature-selector';
import {ALERTSTRIPE_FEILMELDING} from '../konstanter';

const AlertstripeTekniskeProblemer = () => {
    const erAlertstripeFeilmeldingFeatureTogglePa = useFeatureSelector()(ALERTSTRIPE_FEILMELDING);

    return erAlertstripeFeilmeldingFeatureTogglePa ? (
        <AlertStripe type="advarsel" className="stor-feil-modal">
            Vi opplever treghet i oversikten som gjør at noen statusfilter kan vise feil. Vi jobber med å finne løsning
            på problemet, og beklager ulempen det medfører.{' '}
        </AlertStripe>
    ) : null;
};
export default AlertstripeTekniskeProblemer;
