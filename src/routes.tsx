import React from 'react';
import 'moment/locale/nb';
import {Route, Switch} from 'react-router-dom';
import Ny_EnhetSide from './enhetsportefolje/ny_enhet-side';
import Ny_veiledereSide from './veiledere/ny_veiledere-side';
import Ny_MinoversiktSide from "./minoversikt/ny_minoversikt-side";
import EnhetSide from './enhetsportefolje/enhet-side';
import VeiledereSide from './veiledere/veiledere-side';
import MinOversiktSide from './minoversikt/minoversikt-side';
import TilbakemeldingFab from './components/tilbakemelding/tilbakemelding-fab';
import {loggBrowserMetrikker} from './utils/metrikker/browser-metrikker';
import {useFetchPortefoljeData} from './hooks/portefolje/use-fetch-portefolje-data';
import Innholdslaster from './innholdslaster/innholdslaster';
import TourModalLocalStorage from './components/modal/tour-modal/tour-modal-local-storage';
import {useFeatureSelector} from './hooks/redux/use-feature-selector';
import {REDESIGN} from './konstanter';
import {TilToppenKnapp} from "./components/til-toppen-knapp/til-toppen-knapp";

loggBrowserMetrikker();

function Routes() {
    const {enhettiltak, veiledere, portefoljestorrelser} = useFetchPortefoljeData();
    const erRedesignTogglePa = useFeatureSelector()(REDESIGN);

    return (
        <div className="portefolje">
            <div className='maincontent side-innhold'>
                <Innholdslaster avhengigheter={[enhettiltak, veiledere, portefoljestorrelser]}>
                    <Switch>
                        <Route
                            path="/enhet"
                            component={erRedesignTogglePa ? Ny_EnhetSide : EnhetSide}
                        />
                        <Route
                            path="/veiledere"
                            component={erRedesignTogglePa ? Ny_veiledereSide : VeiledereSide}
                        />
                        <Route
                            path="/portefolje/:ident"
                            component={erRedesignTogglePa ? Ny_MinoversiktSide : MinOversiktSide}
                        />
                        <Route
                            path="/portefolje"
                            component={erRedesignTogglePa ? Ny_MinoversiktSide : MinOversiktSide}
                        />
                    </Switch>
                    <TilbakemeldingFab/>
                    <TilToppenKnapp/>
                    <TourModalLocalStorage/>
                </Innholdslaster>
            </div>
        </div>

    );
}

export default Routes;
