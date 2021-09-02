import * as React from 'react';
import Lenke from 'nav-frontend-lenker';
import AlertStripe from 'nav-frontend-alertstriper';
import './modal/feilmelding-brukere.less';
import {useFeatureSelector} from '../hooks/redux/use-feature-selector';
import {ALERTSTRIPE_FEILMELDING} from '../konstanter';

const AlertstripeTekniskeProblemer = () => {
    const erAlertstripeFeilmeldingFeatureTogglePa = useFeatureSelector()(ALERTSTRIPE_FEILMELDING);

    return erAlertstripeFeilmeldingFeatureTogglePa ? (
        <AlertStripe type="advarsel" className="stor-feil-modal">
            Oversikten og aktivitetsplanen vil være utilgjengelig fra lørdag 4. september kl. 09.00. Systemene forventes
            å være oppe igjen lørdag ettermiddag.{' '}
            <Lenke
                href="https://navno.sharepoint.com/sites/intranett-driftsmeldinger/SitePages/Planlagt-nedetid--Modia-arbeidsrettet-oppf%C3%B8lging-har-l%C3%B8rdag-formiddag.aspx"
                target="_blank"
            >
                <b>Les mer på Navet.</b>
            </Lenke>
        </AlertStripe>
    ) : null;
};
export default AlertstripeTekniskeProblemer;
