import * as React from 'react';
import { connect } from 'react-redux';
import InitalDataProvider from './providers/initial-data-provider';
import { Route, Router } from 'react-router';
import EnhetSide from './enhet/enhet-side';
import VeiledereSide from './veiledere/veiledere-side';
import MinOversiktSide from './minoversikt/minoversikt-side';
import { getEnhetFromUrl, sendBrukerTilUrl } from './utils/url-utils';
import { basename } from './history';
import history from './history';

function redirect() {
    const lastPath = localStorage.getItem('lastpath');
    if (lastPath) {
        sendBrukerTilUrl(lastPath);
    } else {
        sendBrukerTilUrl(`/enhet?enhet=${getEnhetFromUrl()}`);
    }
}

function updateLastPath() {
    const base = window.location.pathname.replace(basename, '');
    if (base !== '/tilbake') {
        const search = window.location.search;
        localStorage.setItem('lastpath', base + search);
    }
}

class Routes extends React.Component {
    render() {
        return (
            <Router history={history}>
                <Route
                    path="/"
                    component={InitalDataProvider}
                    onChange={(prevState, nextState) => {
                        updateLastPath();
                        if (nextState.location.action !== 'POP' && nextState.location.action !== 'REPLACE') {
                            window.scrollTo(0, 0);
                        }
                    }}
                >
                    <Route path="enhet" component={EnhetSide} />
                    <Route
                        path="veiledere"
                        component={VeiledereSide}
                    />
                    <Route
                        path="portefolje(/:ident)"
                        component={MinOversiktSide}
                    />
                    <Route onEnter={redirect} path="tilbake" />
                </Route>
            </Router>
        );
    }
}

export default Routes;
