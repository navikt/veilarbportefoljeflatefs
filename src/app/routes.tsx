import * as React from 'react';
import { connect } from 'react-redux';
import InitalDataProvider from './providers/initial-data-provider';
import { Route, Router } from 'react-router';
import EnhetSideVenstreToggle from './enhet/enhet-side-venstre-toggle';
import EnhetSide from './enhet/enhet-side';
import VeiledereSideVenstreToggle from './veiledere/veiledere-side-venstre-toggle';
import VeiledereSide from './veiledere/veiledere-side';
import MinOversiktSideVenstreToggle from './minoversikt/minoversikt-side-venstre-toggle';
import MinOversiktSide from './minoversikt/minoversikt-side';
import { getEnhetFromUrl, sendBrukerTilUrl } from './utils/url-utils';
import { basename } from './history';
import history from './history';
import { sjekkFeature } from './ducks/features';
import { FLYTT_FILTER_VENSTRE } from './konstanter';

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

interface RoutesProps {
    flyttFilterVenstreToggle: boolean;
}

class Routes extends React.Component<RoutesProps> {
    render() {
        const { flyttFilterVenstreToggle } = this.props;
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
                    <Route path="enhet" component={flyttFilterVenstreToggle ? EnhetSideVenstreToggle : EnhetSide} />
                    <Route
                        path="veiledere"
                        component={flyttFilterVenstreToggle ? VeiledereSideVenstreToggle : VeiledereSide}
                    />
                    <Route
                        path="portefolje(/:ident)"
                        component={flyttFilterVenstreToggle ? MinOversiktSideVenstreToggle : MinOversiktSide}
                    />
                    <Route onEnter={redirect} path="tilbake" />
                </Route>
            </Router>
        );
    }
}

const mapStateToProps = (state) => ({
    flyttFilterVenstreToggle: sjekkFeature(state, FLYTT_FILTER_VENSTRE)
});

export default connect(mapStateToProps)(Routes);
