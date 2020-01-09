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

loggBrowserMetrikker();

function Routes() {
    return (
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
    );
}

export default Routes;
