import * as React from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import './modal/feilmelding-brukere.less';
import {useFeatureSelector} from '../hooks/redux/use-feature-selector';
import {ALERTSTRIPE_FEILMELDING} from '../konstanter';

const AlertstripeTekniskeProblemer = () => {
    const erAlertstripeFeilmeldingFeatureTogglePa = useFeatureSelector()(ALERTSTRIPE_FEILMELDING);

    return erAlertstripeFeilmeldingFeatureTogglePa ? (
        <AlertStripe type="advarsel" className="stor-feil-modal">
            <b>
                Oversikten i Modia arbeidsrettet oppfølging blir ikke oppdatert fra onsdag 12. januar kl. 16.00 til
                torsdag morgen
            </b>
            <br />
            Brukerlisten er tilgjengelig, men det vil ikke være oppdatert informasjon i filtrene på grunn av tekniske
            oppgraderinger.
        </AlertStripe>
    ) : null;
};
export default AlertstripeTekniskeProblemer;
