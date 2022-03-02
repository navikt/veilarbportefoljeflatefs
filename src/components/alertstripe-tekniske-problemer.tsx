import * as React from 'react';
import './modal/feilmelding-brukere.less';
import {useFeatureSelector} from '../hooks/redux/use-feature-selector';
import {ALERTSTRIPE_FEILMELDING} from '../konstanter';
import {Alert} from '@navikt/ds-react';

const AlertstripeTekniskeProblemer = () => {
    const erAlertstripeFeilmeldingFeatureTogglePa = useFeatureSelector()(ALERTSTRIPE_FEILMELDING);

    return erAlertstripeFeilmeldingFeatureTogglePa ? (
        <Alert variant="warning" className="stor-feil-modal" size="small">
            <b>
                Oversikten i Modia arbeidsrettet oppfølging blir ikke oppdatert fra onsdag 12. januar kl. 16.00 til
                torsdag morgen
            </b>
            <br />
            Brukerlisten er tilgjengelig, men det vil ikke være oppdatert informasjon i filtrene på grunn av tekniske
            oppgraderinger.
        </Alert>
    ) : null;
};
export default AlertstripeTekniskeProblemer;
