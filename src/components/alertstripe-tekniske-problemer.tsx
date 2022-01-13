import * as React from 'react';
import './modal/feilmelding-brukere.less';
import {useFeatureSelector} from '../hooks/redux/use-feature-selector';
import {ALERTSTRIPE_FEILMELDING} from '../konstanter';
import {Alert} from '@navikt/ds-react';

const AlertstripeTekniskeProblemer = () => {
    const erAlertstripeFeilmeldingFeatureTogglePa = useFeatureSelector()(ALERTSTRIPE_FEILMELDING);

    return erAlertstripeFeilmeldingFeatureTogglePa ? (
        <Alert variant="warning" className="stor-feil-modal">
            Vi opplever treghet i oversikten som gjør at noen statusfilter kan vise feil. Vi jobber med å finne løsning
            på problemet, og beklager ulempen det medfører.{' '}
        </Alert>
    ) : null;
};
export default AlertstripeTekniskeProblemer;
