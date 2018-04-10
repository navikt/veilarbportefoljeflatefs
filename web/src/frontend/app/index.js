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
import VeiledereSide from './veiledere/veiledere-side';
import MinOversiktSide from './minoversikt/minoversikt-side';
import { getEnhetFromUrl, sendBrukerTilUrl, getFrabrukerFraurl } from './utils/url-utils';
import FeatureToggelAdmin from './components/feature-toggle/feature-toggle-admin';
import './style';
import { IKKE_SATT } from './konstanter';

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

function lagrePath() {
    localStorage.setItem('lastpath', window.location.pathname.replace(basename, ''));
}

function getSideTallForPath(path) {
    const checkPath = path.includes('/portefolje') ? '/portefolje' : path;

    if (checkPath === '/enhet' || checkPath === '/portefolje') {
        const sideTall = localStorage.getItem(`${checkPath.substr(1)}-lagretSidetall`) || 1;
        return `&side=${sideTall}`;
    }
    return '';
}

function getSortering(path) {
    const checkPath = path.includes('/portefolje') ? '/portefolje' : path;


    if (checkPath === '/enhet' || checkPath === '/portefolje') {
        const lagretSorteringsfelt = localStorage.getItem('lagretSorteringsfelt') || IKKE_SATT;
        const lagretSorteringsrekkefolge = localStorage.getItem('lagretSorteringsrekkefolge') || IKKE_SATT;
        return `&sorteringsfelt=${lagretSorteringsfelt}&sorteringsrekkefolge=${lagretSorteringsrekkefolge}`;
    }
    return '';
}

function getFraBruker() {
    const fnr = getFrabrukerFraurl();
    if (fnr) {
        return `&fraBruker=${fnr}`;
    }
    return '';
}

function redirect() {
    const lastPath = localStorage.getItem('lastpath');

    if (lastPath) {
        const optionalParams = getSideTallForPath(lastPath) + getSortering(lastPath) + getFraBruker();
        const url = `${lastPath}?enhet=${getEnhetFromUrl() + optionalParams}`;
        sendBrukerTilUrl(url);
    } else {
        sendBrukerTilUrl(`/enhet?enhet=${getEnhetFromUrl()}`);
    }
}

render(
    (
        <Provider store={store}>
            <IntlProvider defaultLocale="nb" locale="nb" messages={tekster}>
                <Router history={history}>
                    <Route
                        path="/"
                        component={InitalDataProvider}
                        onChange={(prevState, nextState) => {
                            if (nextState.location.action !== 'POP' && nextState.location.action !== 'REPLACE') {
                                window.scrollTo(0, 0);
                            }
                        }}
                    >
                        <Route onEnter={lagrePath} path="enhet" component={EnhetSide} />
                        <Route onEnter={lagrePath} path="veiledere" component={VeiledereSide} />
                        <Route onEnter={lagrePath} path="portefolje(/:ident)" component={MinOversiktSide} />
                        <Route onEnter={redirect} path="tilbake" />
                        <Route path="feature-toggle" component={FeatureToggelAdmin} />
                    </Route>
                </Router>
            </IntlProvider>
        </Provider>
    ), document.getElementById('mainapp'));
