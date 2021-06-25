import React from 'react';
import 'moment/locale/nb';
import {Route, Switch} from 'react-router-dom';
import MinoversiktSide from './minoversikt/minoversikt-side';
import MinoversiktSideV1 from './minoversikt_v1/minoversikt-side';
import EnhetSide from './enhetsportefolje/enhet-side';
import EnhetSideV1 from './enhetsportefolje_v1/enhet-side';
import VeiledereSide from './veiledere/veiledere-side';
import TilbakemeldingFab from './components/tilbakemelding/tilbakemelding-fab';
import {useFetchPortefoljeData} from './hooks/portefolje/use-fetch-portefolje-data';
import Innholdslaster from './innholdslaster/innholdslaster';
import TvungenStepper from './components/modal/tour-modal/tvungen-stepper';
import {TilToppenKnapp} from './components/til-toppen-knapp/til-toppen-knapp';
import './style.less';

function Routes() {
    const {enhettiltak, veiledere, portefoljestorrelser} = useFetchPortefoljeData();

    return (
        <div className="portefolje">
                <Innholdslaster avhengigheter={[enhettiltak, veiledere, portefoljestorrelser]}>
                    <Switch>
                        <Route path="/enhet" component={EnhetSide} />
                        <Route path="/enhet1/v1" component={EnhetSideV1} />
                        <Route path="/veiledere" component={VeiledereSide} />
                        <Route path="/portefolje/:ident" component={MinoversiktSide} />
                        <Route path="/portefolje" component={MinoversiktSide} />
                        <Route path="/portefolje_v1/v1" component={MinoversiktSideV1} />
                    </Switch>
                    <TilbakemeldingFab />
                    <TilToppenKnapp />
                    <TvungenStepper/>
                </Innholdslaster>
        </div>
    );
}

export default Routes;
