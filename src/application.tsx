import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import Routes from './routes';
import {Provider} from 'react-redux';
import createStore from './store';
import * as moment from 'moment';
import Modal from 'nav-frontend-modal';
import {Decorator} from "./decorator";
import InitialDataProvider from "./providers/initial-data-provider";

if (process.env.NODE_ENV !== 'test') {
    Modal.setAppElement('#applikasjon');
}
moment.locale('nb');

const store = createStore();


function Application() {
    return (
        <Provider store={store}>
            <BrowserRouter basename="/veilarbportefoljeflatefs">
                <InitialDataProvider>
                    <Decorator/>
                    <Routes/>
                </InitialDataProvider>
            </BrowserRouter>
        </Provider>
    );
}

export default Application;
