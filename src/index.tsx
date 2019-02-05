import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import { Provider } from 'react-redux';
import { addLocaleData, IntlProvider } from 'react-intl';
import nb from 'react-intl/locale-data/nb';
import createStore from './store';
import './style.less';
import Routes from "./routes";


if(process.env.NODE_ENV === "development") {
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

ReactDOM.render(
    (
        <Provider store={store}>
            <IntlProvider defaultLocale="nb" locale="nb" messages={tekster}>
                <Routes />
            </IntlProvider>
        </Provider>
    ), document.getElementById('mainapp'));
