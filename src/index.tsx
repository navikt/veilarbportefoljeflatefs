import React from 'react';
import ReactDOM from 'react-dom';
import Application from './application';
import 'nav-frontend-chevron-style/dist/main.css';
import 'nav-frontend-ekspanderbartpanel-style/dist/main.css';
import 'nav-frontend-grid-style/dist/main.css';
import 'nav-frontend-lenker-style/dist/main.css';
import 'nav-frontend-lukknapp-style/dist/main.css';
import 'nav-frontend-paneler-style/dist/main.css';
import 'nav-frontend-skjema-style/dist/main.css';
import 'nav-frontend-typografi-style/dist/main.css';
import '@navikt/ds-css';
import './style.css';

if (!(window as any)._babelPolyfill) {
    require('babel-polyfill');
}

if (window.localStorage.getItem('filterVersjon') !== 'v1') {
    localStorage.setItem('filterVersjon', 'v1');
    localStorage.removeItem('veilederState');
    localStorage.removeItem('enhetsState');
}

if (process.env.REACT_APP_MOCK === 'true') {
    // eslint-disable-next-line no-console
    console.log('==========================');
    // eslint-disable-next-line no-console
    console.log('======== MED MOCK ========');
    // eslint-disable-next-line no-console
    console.log('==========================');
    require('./mocks');
}

ReactDOM.render(<Application />, document.getElementById('mainapp'));
