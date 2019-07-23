import * as React from 'react';
import 'moment/locale/nb';
import classnames from 'classnames';
import EnhetContext from './components/enhet-context/enhet-context';
import { Route, Switch } from "react-router-dom";
import EnhetSide from "./enhet/enhet-side";
import VeiledereSide from "./veiledere/veiledere-side";
import MinOversiktSide from "./minoversikt/minoversikt-side";
import TilbakemeldingFab from "./components/tilbakemelding/tilbakemelding-fab";
import { loggBrowserMetrikker } from './utils/metrikker/browser-metrikker';
import Modal from 'nav-frontend-modal';
import {VeilarbPortefoljeRedirect} from "./components/redirect/veilarbportefolje-redirect";

loggBrowserMetrikker();

if (process.env.NODE_ENV !== 'test') {
    Modal.setAppElement('#applikasjon');
}

function Routes() {
    return (
        <div className="portefolje">
            <EnhetContext >
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
                            render={(props) => <MinOversiktSide {...props}/>}
                        />
                        <Route
                            path="/portefolje"
                            render={(props) => <MinOversiktSide {...props}/>}
                        />
                        <VeilarbPortefoljeRedirect/>
                    </Switch>
                    <TilbakemeldingFab/>
                </div>
            </EnhetContext>
        </div>
    );
}


export default Routes;
