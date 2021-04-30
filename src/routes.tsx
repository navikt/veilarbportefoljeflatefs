import React from 'react';
import 'moment/locale/nb';
import {Route, Switch} from 'react-router-dom';
import MinoversiktSide from './minoversikt/minoversikt-side';
import EnhetSide from './enhetsportefolje/enhet-side';
import VeiledereSide from './veiledere/veiledere-side';
import TilbakemeldingFab from './components/tilbakemelding/tilbakemelding-fab';
import {useFetchPortefoljeData} from './hooks/portefolje/use-fetch-portefolje-data';
import Innholdslaster from './innholdslaster/innholdslaster';
import TvungenStepper from './components/modal/tour-modal/tvungen-stepper';
import {TilToppenKnapp} from './components/til-toppen-knapp/til-toppen-knapp';
import './style.less';
import {useFeatureSelector} from './hooks/redux/use-feature-selector';
import {SISTE_ENDRING, TVUNGEN_STEPPER} from './konstanter';

function Routes() {
    const {enhettiltak, veiledere, portefoljestorrelser} = useFetchPortefoljeData();
    const erSisteEndringFeatureTogglePa = useFeatureSelector()(SISTE_ENDRING);
    const erTvungenStepperFeatureTogglePa = useFeatureSelector()(TVUNGEN_STEPPER);

    return (
        <div className="portefolje">
            <div className="maincontent side-innhold">
                <Innholdslaster avhengigheter={[enhettiltak, veiledere, portefoljestorrelser]}>
                    <Switch>
                        <Route path="/enhet" component={EnhetSide} />
                        <Route path="/veiledere" component={VeiledereSide} />
                        <Route path="/portefolje/:ident" component={MinoversiktSide} />
                        <Route path="/portefolje" component={MinoversiktSide} />
                    </Switch>
                    <TilbakemeldingFab />
                    <TilToppenKnapp />
                    {erSisteEndringFeatureTogglePa && <TvungenStepper skalVises={erTvungenStepperFeatureTogglePa} />}
                </Innholdslaster>
            </div>
        </div>
    );
}

export default Routes;
