import React from 'react';
import 'moment/locale/nb';
import classnames from 'classnames';
import EnhetContext from './components/enhet-context/enhet-context';
import { Route, Switch } from 'react-router-dom';
import EnhetSide from './enhetsportefolje/enhet-side';
import VeiledereSide from './veiledere/veiledere-side';
import MinOversiktSide from './minoversikt/minoversikt-side';
import TilbakemeldingFab from './components/tilbakemelding/tilbakemelding-fab';
import { loggBrowserMetrikker } from './utils/metrikker/browser-metrikker';
import { VeilarbPortefoljeRedirect } from './components/redirect/veilarbportefolje-redirect';
import AlertStripe from "nav-frontend-alertstriper";

loggBrowserMetrikker();

function Routes() {
    //TODO FIKS THIS
    const erHeroku = process.env.REACT_HEROKU_APP === 'true';

    return (
        <div className="portefolje">
            <EnhetContext>
                <div className={classnames('maincontent', 'side-innhold')}>
                    {erHeroku && <AlertStripe type="advarsel"> Dette er en testapplikasjon. Alle data er fiktive og ingen endring vil bli lagret.</AlertStripe>}
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
            </EnhetContext>
        </div>
    );
}

export default Routes;
