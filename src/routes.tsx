import * as React from 'react';
import 'moment/locale/nb';
import classnames from 'classnames';
import { IntlProvider } from 'react-intl';
import queryString from 'query-string';
import EnhetContext from './components/enhet-context/enhet-context';
import tekstBundle from './tekster-built/bundle';
import { Route, Switch, Redirect } from "react-router-dom";
import EnhetSide from "./enhet/enhet-side";
import VeiledereSide from "./veiledere/veiledere-side";
import MinOversiktSide from "./minoversikt/minoversikt-side";
import TilbakemeldingFab from "./components/tilbakemelding/tilbakemelding-fab";
import { loggBrowserMetrikker } from './utils/metrikker/browser-metrikker';
import Modal from 'nav-frontend-modal';

loggBrowserMetrikker();

if (process.env.NODE_ENV !== 'test') {
    Modal.setAppElement('#applikasjon');
}

function mapTeksterTilNokkelDersomAngitt(ledetekster) {
    const skalViseTekstnokkel = queryString.parse(window.location.search).vistekster; // eslint-disable-line no-undef
    if (skalViseTekstnokkel) {
        return Object.keys(ledetekster).reduce((obj, curr) => ({ ...obj, [curr]: curr }), {});
    }
    return ledetekster;
}

function Routes (props) {
    return (
        <IntlProvider
            defaultLocale="nb"
            locale="nb"
            messages={mapTeksterTilNokkelDersomAngitt(tekstBundle.nb)}
        >
            <div className="portefolje">
                <EnhetContext >
                    <div className={classnames('maincontent', 'side-innhold')}>
                        <Switch>
                            <Route
                                path="/enhet"
                                component={EnhetSide}
                             />
                            <Route
                                path="/veiledere"
                                component={VeiledereSide}
                            />
                            <Route
                                path="/portefolje/:ident"
                                render={(props) => <MinOversiktSide {...props}/>}
                            />
                            <Route
                                path="/portefolje"
                                render={(props) => <MinOversiktSide {...props}/>}
                            />
                            <Route
                                render={() => {
                                    const lastPath = localStorage.getItem('lastpath');
                                    const lastSearch = localStorage.getItem('lastsearch') || '';
                                    if (lastPath && props.location.pathname === "/tilbake") {
                                        return (
                                            <Redirect to={{pathname: lastPath, search: lastSearch}}/>);
                                    } else {
                                        return <Redirect to={'/enhet'}/>;
                                    }
                                }}
                            />
                        </Switch>
                        <TilbakemeldingFab/>
                    </div>
                </EnhetContext>
            </div>
        </IntlProvider>
    );
}


export default Routes;
