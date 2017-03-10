import React, { Component, PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { IntlProvider, addLocaleData } from 'react-intl';
import nb from 'react-intl/locale-data/nb';
import queryString from 'query-string';
import { hentLedetekster } from './ducks/ledetekster';
import Lenker from './lenker/lenker';
import DevTools from './devtools';
import { hentEnheterForVeileder } from './ducks/enheter';
import Innholdslaster from './innholdslaster/innholdslaster';
import initialiserEventhandtering from './eventhandtering';


function mapTeksterTilNokkelDersomAngitt(ledetekster) {
    const skalViseTekstnokkel = queryString.parse(location.search).visTekster;
    if (skalViseTekstnokkel) {
        return Object.keys(ledetekster).reduce((obj, curr) => ({ ...obj, [curr]: curr }), {});
    }
    return ledetekster;
}

addLocaleData(nb);
class Application extends Component {
    componentWillMount() {
        this.props.hentTekster();
        this.props.hentEnheter();
        initialiserEventhandtering();
    }

    render() {
        const { ledetekster = {}, enheter = {}, veiledere, children, routes } = this.props;
        return (
            <IntlProvider
                defaultLocale="nb"
                locale="nb"
                messages={mapTeksterTilNokkelDersomAngitt(ledetekster.data.nb)}
            >
                <div className="portefolje">
                    <Innholdslaster avhengigheter={[ledetekster, enheter, veiledere]}>
                        <div className="container maincontent side-innhold">
                            <Lenker routes={routes} />
                            {children}
                        </div>
                    </Innholdslaster>
                    <div aria-hidden="true">
                        <DevTools />
                    </div>
                </div>
            </IntlProvider>
        );
    }
}

Application.propTypes = {
    children: PT.object,
    routes: PT.arrayOf(PT.object),
    hentTekster: PT.func.isRequired,
    hentEnheter: PT.func.isRequired,
    ledetekster: PT.object,
    enheter: PT.object,
    veiledere: PT.object
};

const mapStateToProps = state => ({
    ledetekster: state.ledetekster,
    enheter: state.enheter,
    veiledere: state.veiledere
});

const mapDispatchToProps = dispatch => ({
    hentTekster: () => dispatch(hentLedetekster()),
    hentEnheter: ident => dispatch(hentEnheterForVeileder(ident))
});

export default connect(mapStateToProps, mapDispatchToProps)(Application);
