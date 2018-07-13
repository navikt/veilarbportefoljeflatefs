import React, { Component, PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { IntlProvider, addLocaleData } from 'react-intl';
import nb from 'react-intl/locale-data/nb';
import queryString from 'query-string';
import Innholdslaster from './innholdslaster/innholdslaster';
import rendreDekorator from './eventhandtering';
import { settSide } from './ducks/ui/side';
import history from './history';
import { enhetShape, valgtEnhetShape, veiledereShape } from './proptype-shapes';
import EnhetContext from './components/enhet-context/enhet-context';
import ledetekster from './../tekster';

function mapTeksterTilNokkelDersomAngitt(locale) {
    const skalViseTekstnokkel = queryString.parse(location.search).vistekster; // eslint-disable-line no-undef
    if (skalViseTekstnokkel) {
        return Object.keys(ledetekster[locale]).reduce((obj, curr) => ({ ...obj, [curr]: curr }), {});
    }
    return ledetekster[locale];
}

addLocaleData(nb);
class Application extends Component {
    componentWillMount() {
        rendreDekorator();
    }

    componentDidMount() {
        this.oppdaterSideState();
        const pathname = location.pathname;// eslint-disable-line no-undef
        if (pathname === '/veilarbportefoljeflatefs/' ||
            pathname === '/veilarbportefoljeflatefs') {
            history.push('/enhet');
        }
    }

    oppdaterSideState() {
        const { routes } = this.props;
        const lastFragment = routes[routes.length - 1].path;

        if (this.props.side !== lastFragment) {
            this.props.settSide(lastFragment);
        }
    }

    render() {
        const { enheter, children, veiledere } = this.props;
        const locale = 'nb';

        return (
            <IntlProvider
                defaultLocale={locale}
                locale={locale}
                messages={mapTeksterTilNokkelDersomAngitt(locale)}
            >
                <div className="portefolje">
                    <Innholdslaster avhengigheter={[enheter, enheter.valgtEnhet, veiledere]}>
                        <EnhetContext />
                        <div className="container maincontent side-innhold">
                            {children}
                        </div>
                    </Innholdslaster>
                </div>
            </IntlProvider>
        );
    }
}

Application.propTypes = {

    settSide: PT.func.isRequired,
    routes: PT.arrayOf(PT.object).isRequired,
    side: PT.string.isRequired,
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

const mapStateToProps = (state) => ({
    side: state.ui.side.side
});

const mapDispatchToProps = (dispatch) => ({
    settSide: (side) => dispatch(settSide(side))
});

export default connect(mapStateToProps, mapDispatchToProps)(Application);
