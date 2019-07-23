import React from 'react';
import InitalDataProvider from './providers/initial-data-provider';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import { basename } from './history';
import rendreDekorator from './eventhandtering';
import {Provider} from "react-redux";
import createStore from "./store";
import * as moment from "moment";

moment.locale('nb');

const store = createStore();

class Application extends React.Component {
    componentWillMount() {
        rendreDekorator();
    }

    render() {
        return (
            <Provider store={store}>
                <InitalDataProvider>
                    <BrowserRouter basename={basename}>
                        <Routes/>
                    </BrowserRouter>
                </InitalDataProvider>
            </Provider>
        );
    }
}

export default Application;
