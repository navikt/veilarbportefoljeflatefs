import React from 'react';
import ReactDOM from 'react-dom';
import Application from './application';
import './style.less';
import '@navikt/ds-css';

if (!(window as any)._babelPolyfill) {
    require('babel-polyfill');
}

if (window.localStorage.getItem('filterVersjon') !== 'v1') {
    localStorage.setItem('filterVersjon', 'v1');
    localStorage.removeItem('veilederState');
    localStorage.removeItem('enhetsState');
}

if (process.env.REACT_APP_MOCK === 'true') {
    console.log('==========================');
    console.log('======== MED MOCK ========');
    console.log('==========================');
    require('./mocks');
}

ReactDOM.render(<Application />, document.getElementById('mainapp'));
