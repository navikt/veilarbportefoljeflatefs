import * as React from 'react';
import InitalDataProvider from './providers/initial-data-provider';
import { BrowserRouter } from 'react-router-dom';
import Application from './application';
import { basename } from './history';
import rendreDekorator from './eventhandtering';
import {Provider} from "react-redux";
import {addLocaleData, IntlProvider} from "react-intl";
import nb from "react-intl/locale-data/nb";
import createStore from "./store";
import * as moment from "moment";

moment.locale('nb');
addLocaleData(nb);

const store = createStore();
const tekster = { nb: { spinner: 'spinner' } };

class Routes extends React.Component {
    componentWillMount() {
        rendreDekorator();
    }

    render() {
        return (
            <Provider store={store}>
                <IntlProvider defaultLocale="nb" locale="nb" messages={tekster}>
                    <InitalDataProvider>
                        <BrowserRouter basename={basename}>
                            <Application/>
                        </BrowserRouter>
                    </InitalDataProvider>
                </IntlProvider>
            </Provider>
        );
    }
}

export default Routes;
