import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import { Provider } from 'react-redux';
import { addLocaleData, IntlProvider } from 'react-intl';
import nb from 'react-intl/locale-data/nb';
import createStore from './store';
import Routes from './routes';
import './style.less';

if (!(window as any)._babelPolyfill) {
    require('babel-polyfill'); // tslint:disable-line
}

if(process.env.REACT_APP_MOCK === 'true') {
    console.log('=========================='); // tslint:disable-line
    console.log('======== MED MOCK ========'); // tslint:disable-line
    console.log('=========================='); // tslint:disable-line
    require('./mocks'); // tslint:disable-line
}

addLocaleData(nb);

const store = createStore();
const tekster = { nb: { spinner: 'spinner' } };

ReactDOM.render(
    (<Provider store={store}>
            <IntlProvider defaultLocale="nb" locale="nb" messages={tekster}>
                <Routes />
            </IntlProvider>
        </Provider>
    ), document.getElementById('mainapp'));
