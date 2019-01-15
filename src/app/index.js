import { render } from 'react-dom';
/* eslint-disable import/first */
import 'whatwg-fetch';
import React from 'react';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router';
import { addLocaleData, IntlProvider } from 'react-intl';
import nb from 'react-intl/locale-data/nb';
import InitalDataProvider from './providers/initial-data-provider';
import createStore from './store';
import history, { basename } from './history';
import EnhetSide from './enhet/enhet-side';
import EnhetSideVenstreToggle from './enhet/enhet-side-venstre-toggle';
import VeiledereSide from './veiledere/veiledere-side';
import VeiledereSideVenstreToggle from './veiledere/veiledere-side-venstre-toggle';
import MinOversiktSide from './minoversikt/minoversikt-side';
import MinOversiktSideVenstreToggle from './minoversikt/minoversikt-side-venstre-toggle';
import { getEnhetFromUrl, sendBrukerTilUrl } from './utils/url-utils';
import './style';

/* eslint-disable no-undef */
if (!window._babelPolyfill) { // eslint-disable-line no-underscore-dangle
    require('babel-polyfill'); // eslint-disable-line global-require
}

if (MOCK) {
    console.log('=========================='); // eslint-disable-line no-console
    console.log('======== MED MOCK ========'); // eslint-disable-line no-console
    console.log('=========================='); // eslint-disable-line no-console
    require('./mocks'); // eslint-disable-line global-require
}


/* eslint-enable import/first */
/* eslint-disable no-undef */

addLocaleData(nb);

const store = createStore();
const tekster = { nb: { spinner: 'spinner' } };

function redirect() {
    const lastPath = localStorage.getItem('lastpath');
    if (lastPath) {
        sendBrukerTilUrl(lastPath);
    } else {
        sendBrukerTilUrl(`/enhet?enhet=${getEnhetFromUrl()}`);
    }
}

function updateLastPath() {
    const base = window.location.pathname.replace(basename, '');
    if (base !== '/tilbake') {
        const search = window.location.search;
        localStorage.setItem('lastpath', base + search);
    }
}

const mockFlyttVenstreToggle = true;

render(
    (
        <Provider store={store}>
            <IntlProvider defaultLocale="nb" locale="nb" messages={tekster}>
                <Router history={history}>
                    <Route
                        path="/"
                        component={InitalDataProvider}
                        onChange={(prevState, nextState) => {
                            updateLastPath();
                            if (nextState.location.action !== 'POP' && nextState.location.action !== 'REPLACE') {
                                window.scrollTo(0, 0);
                            }
                        }}
                    >
                        <Route path="enhet" component={mockFlyttVenstreToggle ? EnhetSideVenstreToggle : EnhetSide} />
                        <Route
                            path="veiledere"
                            component={mockFlyttVenstreToggle ? VeiledereSideVenstreToggle : VeiledereSide}
                        />
                        <Route
                            path="portefolje(/:ident)"
                            component={mockFlyttVenstreToggle ? MinOversiktSideVenstreToggle : MinOversiktSide}
                        />
                        <Route onEnter={redirect} path="tilbake" />
                    </Route>
                </Router>
            </IntlProvider>
        </Provider>
    ), document.getElementById('mainapp'));
