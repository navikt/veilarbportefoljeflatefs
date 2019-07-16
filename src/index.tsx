import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
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

ReactDOM.render(<Routes/>, document.getElementById('mainapp'));
