import * as React from "react";
import {basename} from "./history";
import {withRouter} from "react-router-dom";
import {RouterState} from "react-router";
import {sendBrukerTilUrl} from "./utils/url-utils";


interface UpdatelastpathWrapperProps {
    children: React.ReactNode
}


class HandterTilbakeUrl extends React.Component<RouterState & UpdatelastpathWrapperProps> {


    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.updateLastPath();
        }
    }

    updateLastPath = () => {
        const base = this.props.location.pathname.replace(basename, '');
        if (base !== '/tilbake') {
            const search = window.location.search;
            localStorage.setItem('lastpath', base + search);
        }
    };

    redirect = () => {
        const lastPath = localStorage.getItem('lastpath');
        if (lastPath) {
            sendBrukerTilUrl(lastPath);
        }
    };

    render() {
        return this.props.children;
    }
}


export default withRouter(HandterTilbakeUrl);
