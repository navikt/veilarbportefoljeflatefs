/* eslint-disable */
import 'babel-polyfill';
import 'whatwg-fetch';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { useRouterHistory, Router, Route, IndexRoute } from 'react-router';
import { createHistory } from 'history';
import { IntlProvider, addLocaleData } from 'react-intl';
import nb from 'react-intl/locale-data/nb';
import Application from './application/application.js';
import createStore from './store.js';
import history from './history';
import EnhetSide from './enhet/enhet-side';
import PortefoljeSide from './portefolje/portefolje-side';

addLocaleData(nb);

let store = createStore();
const tekster = { nb: { spinner: 'spinner' } };

render(
    (
        <Provider store={store}>
            <IntlProvider defaultLocale="nb" locale="nb" messages={tekster}>
                <Router history={history}>
                    <Route path="/" component={Application}>
                        <Route path="enhet" component={EnhetSide} />
                        <Route path="portefolje" component={PortefoljeSide} />
                    </Route>
                </Router>
            </IntlProvider>
        </Provider>
    ), document.getElementById('mainapp'));
