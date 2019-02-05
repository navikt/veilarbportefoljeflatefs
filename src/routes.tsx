import * as React from 'react';
import InitalDataProvider from './providers/initial-data-provider';
import {BrowserRouter} from 'react-router-dom';
import { getEnhetFromUrl, sendBrukerTilUrl } from './utils/url-utils';
import Application from "./application";
import {basename} from "./history";

function redirect() {
    const lastPath = localStorage.getItem('lastpath');
    if (lastPath) {
        sendBrukerTilUrl(lastPath);
    } else {
        sendBrukerTilUrl(`/enhet?enhet=${getEnhetFromUrl()}`);
    }
}

class Routes extends React.Component {
    //KANSKE DIDMOUNT?
    componentWillMount(){
        redirect();
    }

    render() {
        return (
            <InitalDataProvider>
                <BrowserRouter>
                    <Application/>
                </BrowserRouter>
            </InitalDataProvider>
        );
    }
}

export default Routes;
