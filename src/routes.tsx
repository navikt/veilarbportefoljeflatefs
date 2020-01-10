import React from 'react';
import 'moment/locale/nb';
import classnames from 'classnames';
import { Route, Switch } from 'react-router-dom';
import EnhetSide from './enhetsportefolje/enhet-side';
import VeiledereSide from './veiledere/veiledere-side';
import MinOversiktSide from './minoversikt/minoversikt-side';
import TilbakemeldingFab from './components/tilbakemelding/tilbakemelding-fab';
import { loggBrowserMetrikker } from './utils/metrikker/browser-metrikker';
import { VeilarbPortefoljeRedirect } from './components/redirect/veilarbportefolje-redirect';
import Innholdslaster from './innholdslaster/innholdslaster';
import { useDispatchStatustallInnloggetveileder } from './hooks/redux/use-dispatch-statustall-innloggetveileder';
import { useSelector } from 'react-redux';
import { AppState } from './reducer';

loggBrowserMetrikker();

function Routes() {
    const statusTallInloggetVeileder = useSelector((state: AppState) => state.statustallInloggetVeileder);
    useDispatchStatustallInnloggetveileder();

    return (
        <Innholdslaster avhengigheter={[statusTallInloggetVeileder]}>
            <div className="portefolje">
                    <div className={classnames('maincontent', 'side-innhold')}>
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
                            <VeilarbPortefoljeRedirect/>
                        </Switch>
                        <TilbakemeldingFab/>
                    </div>
            </div>
        </Innholdslaster>
    );
}

export default Routes;
