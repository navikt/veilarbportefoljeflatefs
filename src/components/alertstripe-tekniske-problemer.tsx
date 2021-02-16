import * as React from 'react';
import Lenke from 'nav-frontend-lenker';
import AlertStripe from 'nav-frontend-alertstriper';
import './modal/feilmelding-brukere.less';
import {useFeatureSelector} from '../hooks/redux/use-feature-selector';
import {ALERTSTRIPE_FEILMELDING} from '../konstanter';

function AlertstripeTekniskeProblemer() {
    const erAlertstripeFeilmeldingFeatureTogglePa = useFeatureSelector()(ALERTSTRIPE_FEILMELDING);

    return erAlertstripeFeilmeldingFeatureTogglePa ? (
        <AlertStripe type="advarsel" className="stor-feil-modal" form="inline">
            Oversikten og aktivitetsplanen vil være utilgjengelig fra 12. februar kl. 20:00. Systemene forventes å være
            oppe igjen natt til lørdag.{' '}
            <Lenke href="https://navno.sharepoint.com/sites/intranett-driftsmeldinger/" target="_blank">
                <b>Les mer om feilen på driftsmeldinger på Navet.</b>
            </Lenke>
        </AlertStripe>
    ) : (
        <></>
    );
}
export default AlertstripeTekniskeProblemer;
