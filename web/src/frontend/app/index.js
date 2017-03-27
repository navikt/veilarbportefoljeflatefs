/* eslint-disable */
if (!window._babelPolyfill) {
    require('babel-polyfill');
}
import "whatwg-fetch";
import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import {useRouterHistory, Router, Route, IndexRoute} from "react-router";
import {createHistory} from "history";
import {IntlProvider, addLocaleData} from "react-intl";
import nb from "react-intl/locale-data/nb";
import Application from "./application.js";
import createStore from "./store.js";
import history from "./history";
import EnhetSide from "./enhet/enhet-side";
import VeiledereSide from "./veiledere/veiledere-side";
import MinOversiktSide from "./minoversikt/minoversikt-side";
import TilbakeTilEnhetportefolje from './tilbakenavigering/tilbakenavigering-enhet';
import TilbakeTilVeilederportefolje from './tilbakenavigering/tilbakenavigering-veileder';


addLocaleData(nb);

export const store = createStore();
const tekster = {nb: {spinner: 'spinner'}};

render(
    (
        <Provider store={store}>
            <IntlProvider defaultLocale="nb" locale="nb" messages={tekster}>
                <Router history={history}>
                    <Route path="/" component={Application}>
                        <Route path="enhet" component={EnhetSide}/>
                        <Route path="veiledere" component={VeiledereSide}/>
                        <Route path="portefolje(/:ident)" component={MinOversiktSide} />
                        <Route path="tilbaketilenhet" component={TilbakeTilEnhetportefolje}/>
                        <Route path="tilbaketilveileder" component={TilbakeTilVeilederportefolje}/>
                    </Route>
                </Router>
            </IntlProvider>
        </Provider>
    ), document.getElementById('mainapp'));
