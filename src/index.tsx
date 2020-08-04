import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import Application from './application';
import './style.less';
import {erHeroku} from "./utils/utils";

if (!(window as any)._babelPolyfill) {
    require('babel-polyfill'); // tslint:disable-line
}

//TODO GJOR DET BEDRE
if(window.localStorage.getItem('filterVersjon') !== 'v1') {
    localStorage.setItem('filterVersjon', 'v1');
    localStorage.removeItem('veilederState');
    localStorage.removeItem('enhetsState');
}

if(process.env.REACT_APP_MOCK === 'true') {
    console.log('=========================='); // tslint:disable-line
    console.log('======== MED MOCK ========'); // tslint:disable-line
    console.log('=========================='); // tslint:disable-line
    require('./mocks'); // tslint:disable-line
}

ReactDOM.render(<Application/>, document.getElementById('mainapp'));
