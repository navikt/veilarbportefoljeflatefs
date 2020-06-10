import React from 'react';
import 'moment/locale/nb';
import { Route, Switch } from 'react-router-dom';
import EnhetSide from './enhetsportefolje/enhet-side';
import VeiledereSide from './veiledere/veiledere-side';
import MinOversiktSide from './minoversikt/minoversikt-side';
import EnhetSideGammel from './enhetsportefolje/gammel-enhet-side';
import VeiledereSideGammel from './veiledere/gammel-veiledere-side';
import MinOversiktSideGammel from './minoversikt/gammel-minoversikt-side';
import TilbakemeldingFab from './components/tilbakemelding/tilbakemelding-fab';
import { loggBrowserMetrikker } from './utils/metrikker/browser-metrikker';
import { useFetchPortefoljeData } from './hooks/portefolje/use-fetch-portefolje-data';
import Innholdslaster from './innholdslaster/innholdslaster';
import TourModalLocalStorage from './components/modal/tour-modal/tour-modal-local-storage';
import { useFeatureSelector } from './hooks/redux/use-feature-selector';
import { REDESIGN } from './konstanter';

loggBrowserMetrikker();

function Routes() {
    const {enhettiltak, veiledere, portefoljestorrelser} = useFetchPortefoljeData();
    const erRedesignTogglePa = useFeatureSelector()(REDESIGN);

    return (
        <div className="portefolje">
            <div className='maincontent side-innhold'>
                <Innholdslaster avhengigheter={[enhettiltak, veiledere, portefoljestorrelser]}>
                    <Switch>
                        {erRedesignTogglePa ?
                            <>
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
                            </>
                            : <>
                                <Route
                                    path="/enhet"
                                    component={EnhetSideGammel}
                                />
                                <Route
                                    path="/veiledere"
                                    component={VeiledereSideGammel}
                                />
                                <Route
                                    path="/portefolje/:ident"
                                    component={MinOversiktSideGammel}
                                />
                                <Route
                                    path="/portefolje"
                                    component={MinOversiktSideGammel}
                                />
                            </>
                        }
                    </Switch>
                    <TilbakemeldingFab/>
                    <TourModalLocalStorage/>
                </Innholdslaster>
            </div>
        </div>

    );
}

export default Routes;
