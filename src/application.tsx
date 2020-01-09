import React from 'react';
import InitalDataProvider from './providers/initial-data-provider';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import { basename } from './history';
import { Provider } from 'react-redux';
import createStore from './store';
import * as moment from 'moment';
import Modal from 'nav-frontend-modal';
import {Decorator} from "./decorator";

if (process.env.NODE_ENV !== 'test') {
    Modal.setAppElement('#applikasjon');
}
moment.locale('nb');

const store = createStore();


function Application() {
    return (
        <Provider store={store}>
            <BrowserRouter basename={basename}>
                <Decorator/>
                <InitalDataProvider>
                    <Routes/>
                </InitalDataProvider>
            </BrowserRouter>
        </Provider>
    );
}

export default Application;
