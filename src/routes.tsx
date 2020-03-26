import React from 'react';
import 'moment/locale/nb';
import { Route, Switch } from 'react-router-dom';
import EnhetSide from './enhetsportefolje/enhet-side';
import VeiledereSide from './veiledere/veiledere-side';
import MinOversiktSide from './minoversikt/minoversikt-side';
import TilbakemeldingFab from './components/tilbakemelding/tilbakemelding-fab';
import { loggBrowserMetrikker } from './utils/metrikker/browser-metrikker';
import { useFetchPortefoljeData } from './hooks/portefolje/use-fetch-portefolje-data';
import Innholdslaster from './innholdslaster/innholdslaster';
import TourModalLocalStorage from './components/modal/tour-modal/tour-modal-local-storage';

loggBrowserMetrikker();

function Routes() {
    const {enhettiltak, veiledere, portefoljestorrelser} = useFetchPortefoljeData();
    return (
        <div className="portefolje">
            <div className='maincontent side-innhold'>
                <Innholdslaster avhengigheter={[enhettiltak, veiledere, portefoljestorrelser]}>
                    <Switch>
                        <Route
                            path="/enhet"
                            component={EnhetSide}
                        />
                        <Route
                            path="/veiledere"
                            component={VeiledereSide}
                        />
                        <Route
                            path="/portefolje/:ident"
                            component={MinOversiktSide}
                        />
                        <Route
                            path="/portefolje"
                            component={MinOversiktSide}
                        />
                    </Switch>
                    <TilbakemeldingFab/>
                    <TourModalLocalStorage/>
                </Innholdslaster>
            </div>
        </div>

    );
}

export default Routes;
