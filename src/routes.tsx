import React from 'react';
import 'moment/locale/nb';
import {Route, Switch} from 'react-router-dom';
import MinoversiktSide from './minoversikt/minoversikt-side';
import EnhetSide from './enhetsportefolje/enhet-side';
import VeiledereSide from './veiledere/veiledere-side';
import TilbakemeldingFab from './components/tilbakemelding/tilbakemelding-fab';
import {useFetchPortefoljeData} from './hooks/portefolje/use-fetch-portefolje-data';
import Innholdslaster from './innholdslaster/innholdslaster';
import TourModalLocalStorage from './components/modal/tour-modal/tour-modal-local-storage';
import {TilToppenKnapp} from './components/til-toppen-knapp/til-toppen-knapp';
import './style.less';

function Routes() {
    const {enhettiltak, veiledere, portefoljestorrelser} = useFetchPortefoljeData();

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
                    <TourModalLocalStorage skalVises={false} />
                </Innholdslaster>
            </div>
        </div>
    );
}

export default Routes;
