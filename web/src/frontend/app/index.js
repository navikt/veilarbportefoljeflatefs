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

addLocaleData(nb);

let store = createStore();
// const tekster = { nb: { spinner: 'spinner' } };

render(
    (
        <Provider store={store}>
            <IntlProvider defaultLocale="nb" locale="nb">
                <Router history={history}>
                    <Route path="/" component={Application}>
                    </Route>
                </Router>
            </IntlProvider>
        </Provider>
    ), document.getElementById('mainapp'));
