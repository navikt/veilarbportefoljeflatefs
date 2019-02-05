import * as React from 'react';
import InitalDataProvider from './providers/initial-data-provider';
import {BrowserRouter} from 'react-router-dom';
import Application from "./application";
import {basename} from "./history";
import rendreDekorator from "./eventhandtering";


class Routes extends React.Component {

    componentWillMount(){
        rendreDekorator();
    }

    render() {
        return (
            <InitalDataProvider>
                <BrowserRouter basename={basename}>
                    <Application/>
                </BrowserRouter>
            </InitalDataProvider>
        );
    }
}

export default Routes;
