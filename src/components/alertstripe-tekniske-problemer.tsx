import * as React from 'react';
import Lenke from 'nav-frontend-lenker';
import AlertStripe from 'nav-frontend-alertstriper';
import './modal/feilmelding-brukere.less';
import {useFeatureSelector} from '../hooks/redux/use-feature-selector';
import {ALERTSTRIPE_FEILMELDING} from '../konstanter';

function AlertstripeTekniskeProblemer() {
    const erAlertstripeAdvarselFeatureTogglePa = useFeatureSelector()(ALERTSTRIPE_FEILMELDING);

    return erAlertstripeAdvarselFeatureTogglePa ? (
        <AlertStripe type="advarsel" className="stor-feil-modal" form="inline">
            Vi har dessverre tekniske problemer som kan medføre ustabilitet og/eller feil med filtreringer. Feilretting
            pågår.{' '}
            <Lenke href="https://navno.sharepoint.com/sites/intranett-driftsmeldinger/" target="_blank">
                <b>Les mer om feilen på driftsmeldinger på Navet.</b>
            </Lenke>
        </AlertStripe>
    ) : (
        <></>
    );
}
export default AlertstripeTekniskeProblemer;
