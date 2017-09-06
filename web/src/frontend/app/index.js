/* eslint-disable no-undef*/
if (!window._babelPolyfill) { // eslint-disable-line no-underscore-dangle
    require('babel-polyfill'); // eslint-disable-line global-require
}

if (process.env.NODE_ENV !== 'production') {
    console.log('Med mock');
    require('./mocks'); // eslint-disable-line global-require
}


/* eslint-disable import/first */
import 'whatwg-fetch';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import { IntlProvider, addLocaleData } from 'react-intl';
import nb from 'react-intl/locale-data/nb';
import Application from './application';
import createStore from './store';
import history, { basename } from './history';
import EnhetSide from './enhet/enhet-side';
import VeiledereSide from './veiledere/veiledere-side';
import MinOversiktSide from './minoversikt/minoversikt-side';
import { getEnhetFromUrl, sendBrukerTilUrl } from './utils/utils';
/* eslint-enable import/first */
/* eslint-disable no-undef */

addLocaleData(nb);

const store = createStore();
const tekster = { nb: { spinner: 'spinner' } };

function lagrePath() {
    localStorage.setItem('lastpath', window.location.pathname.replace(basename, ''));
}

function redirect() {
    const lastPath = localStorage.getItem('lastpath');
    if (lastPath) {
        sendBrukerTilUrl(`${lastPath}?enhet=${getEnhetFromUrl()}`);
    }
}

render(
    (
        <Provider store={store}>
            <IntlProvider defaultLocale="nb" locale="nb" messages={tekster}>
                <Router history={history}>
                    <Route
                        path="/"
                        component={Application}
                        onChange={(prevState, nextState) => {
                            if (nextState.location.action !== 'POP') {
                                window.scrollTo(0, 0);
                            }
                        }}
                    >
                        <Route onEnter={lagrePath} path="enhet" component={EnhetSide} />
                        <Route onEnter={lagrePath} path="veiledere" component={VeiledereSide} />
                        <Route onEnter={lagrePath} path="portefolje(/:ident)" component={MinOversiktSide} />
                        <Route onEnter={redirect} path="tilbake" />
                    </Route>
                </Router>
            </IntlProvider>
        </Provider>
    ), document.getElementById('mainapp'));
