import React from 'react';
import 'moment/locale/nb';
import classnames from 'classnames';
import {Redirect, Route, Switch} from 'react-router-dom';
import EnhetSide from './enhetsportefolje/enhet-side';
import VeiledereSide from './veiledere/veiledere-side';
import MinOversiktSide from './minoversikt/minoversikt-side';
import TilbakemeldingFab from './components/tilbakemelding/tilbakemelding-fab';
import { loggBrowserMetrikker } from './utils/metrikker/browser-metrikker';
import {useDispatchStatustallInnloggetveileder} from "./hooks/redux/use-dispatch-statustall-innloggetveileder";
import {VeilarbPortefoljeRedirect} from "./components/redirect/veilarbportefolje-redirect";
import Lenker from "./lenker/lenker";
import Toasts from "./components/toast/toast";
import {ToppMeny} from "./components/topp-meny/topp-meny";

loggBrowserMetrikker();

function Routes() {

    useDispatchStatustallInnloggetveileder();

    return (
        <div className="portefolje">
            <div className={classnames('maincontent', 'side-innhold')}>
                <ToppMeny/>
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
            </div>
        </div>
    );
}

export default Routes;
