import React, { Component} from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { IntlProvider, addLocaleData } from 'react-intl';
import nb from 'react-intl/locale-data/nb';
import queryString from 'query-string';
import EnhetContext from './components/enhet-context/enhet-context';
import tekstBundle from './tekster-built/bundle';
import { sjekkFeature } from './ducks/features';
import { FLYTT_FILTER_VENSTRE } from './konstanter';
import {Route, withRouter, Switch, Redirect} from "react-router-dom";
import EnhetSide from "./enhet/enhet-side";
import VeiledereSide from "./veiledere/veiledere-side";
import MinOversiktSide from "./minoversikt/minoversikt-side";
import EnhetSideVenstreToggle from "./enhet/enhet-side-venstre-toggle";
import MinOversiktSideVenstreToggle from "./minoversikt/minoversikt-side-venstre-toggle";
import VeiledereSideVenstreToggle from "./veiledere/veiledere-side-venstre-toggle";
import TilbakemeldingFab from "./components/tilbakemelding/tilbakemelding-fab";
import {getEnhetFromUrl, sendBrukerTilUrl} from "./utils/url-utils";
import {basename} from "./history";

function mapTeksterTilNokkelDersomAngitt(ledetekster) {
    const skalViseTekstnokkel = queryString.parse(window.location.search).vistekster; // eslint-disable-line no-undef
    if (skalViseTekstnokkel) {
        return Object.keys(ledetekster).reduce((obj, curr) => ({ ...obj, [curr]: curr }), {});
    }
    return ledetekster;
}

addLocaleData(nb);



class Application extends Component {
    componentWillMount() {
        this.redirect();
    }

    componentDidUpdate(prevProps) {
        if(this.props.location !== prevProps.location) {
            this.updateLastPath();
        }
    }

    updateLastPath() {
        const base = this.props.location.pathname.replace(basename, '');
        if (base !== '/tilbake') {
            const search = window.location.search;
            localStorage.setItem('lastpath', base + search);
        }
    }
    redirect()
    {
        const lastPath = localStorage.getItem('lastpath');
        if (lastPath) {
            sendBrukerTilUrl(lastPath);
        }
    }

    render() {
        const {flyttFilterTilVenstre } = this.props;
        return (
            <IntlProvider
                defaultLocale="nb"
                locale="nb"
                messages={mapTeksterTilNokkelDersomAngitt(tekstBundle.nb)}
            >
                <div className="portefolje">
                    <EnhetContext >
                        <div
                            className = {classnames({ container: !flyttFilterTilVenstre }, 'maincontent', 'side-innhold')}
                        >
                            <Switch>
                                <Route
                                    path="/enhet"
                                    render={() =>
                                        flyttFilterTilVenstre ?
                                            <EnhetSideVenstreToggle/> :
                                            <EnhetSide/>} />
                                <Route
                                    path="/veiledere"
                                    render={() =>
                                        flyttFilterTilVenstre ?
                                            <VeiledereSideVenstreToggle/> :
                                            <VeiledereSide/>}
                                />
                                <Route
                                    path="/portefolje/:ident"
                                    render={(props) =>
                                        flyttFilterTilVenstre ?
                                            <MinOversiktSideVenstreToggle {...props}/> :
                                            <MinOversiktSide {...props}/>}
                                />
                                <Route
                                    path="/portefolje"
                                    render={(props) =>
                                        flyttFilterTilVenstre ?
                                            <MinOversiktSideVenstreToggle {...props}/> :
                                            <MinOversiktSide {...props}/>}
                                />
                                <Route
                                    render={() => <Redirect to ="/enhet"/>}
                                />
                            </Switch>
                            <TilbakemeldingFab/>
                        </div>
                    </EnhetContext>
                </div>
            </IntlProvider>
        );
    }
}

/*
Application.propTypes = {
    settSide: PT.func.isRequired,
    routes: PT.arrayOf(PT.object).isRequired,
    side: PT.string.isRequired,
    flyttFilterTilVenstre: PT.bool,
    children: PT.oneOfType([PT.arrayOf(PT.node), PT.node]),
    enheter: PT.shape({
        data: PT.arrayOf(enhetShape).isRequired,
        valgtEnhet: valgtEnhetShape.isRequired,
        ident: PT.string,
        status: PT.string.isRequired
    }).isRequired,
    veiledere: PT.shape({
        status: PT.string.isRequired,
        data: veiledereShape.isRequired,
        veiledereITabell: PT.arrayOf(veiledereShape)
    }).isRequired
};
*/
const mapStateToProps = (state) => ({
    flyttFilterTilVenstre: sjekkFeature(state, FLYTT_FILTER_VENSTRE),
});

export default withRouter(connect(mapStateToProps)(Application));
