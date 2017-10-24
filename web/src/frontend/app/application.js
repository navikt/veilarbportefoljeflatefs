import React, { Component, PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { IntlProvider, addLocaleData } from 'react-intl';
import nb from 'react-intl/locale-data/nb';
import queryString from 'query-string';
import { hentLedetekster } from './ducks/ledetekster';
import { hentEnheterForVeileder, velgEnhetForVeileder } from './ducks/enheter';
import Innholdslaster from './innholdslaster/innholdslaster';
import rendreDekorator, { settEnhetIDekorator } from './eventhandtering';
import { STATUS } from './ducks/utils';
import { leggEnhetIUrl } from './utils/utils';
import { hentVeiledereForEnhet } from './ducks/veiledere';
import { settSide } from './ducks/ui/side';
import history from './history';
import { enhetShape, valgtEnhetShape, veiledereShape } from './proptype-shapes';
import FeatureToggle from './components/feature-toggle/feature-toggle';
import EnhetContext from './components/enhet-context/enhet-context';
import { hentAktivEnhet } from './components/enhet-context/context-api';

function mapTeksterTilNokkelDersomAngitt(ledetekster) {
    const skalViseTekstnokkel = queryString.parse(location.search).vistekster; // eslint-disable-line no-undef
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

    componentDidUpdate() {
        const { enheter } = this.props;
        if (enheter.status === STATUS.OK && enheter.valgtEnhet.status !== STATUS.OK) {
            this.oppdaterDekoratorMedInitiellEnhet();
        }
        this.oppdaterSideState();
    }

    oppdaterSideState() {
        const { routes } = this.props;
        const lastFragment = routes[routes.length - 1].path;

        if (this.props.side !== lastFragment) {
            this.props.settSide(lastFragment);
        }
    }

    finnInitiellEnhet() {
        const { enheter } = this.props;

        const enhetliste = enheter.data;
        const enhetFraUrl = queryString.parse(location.search).enhet;// eslint-disable-line no-undef
        const enhetIdListe = enhetliste.map((enhet) => (enhet.enhetId));

        if (enhetIdListe.includes(enhetFraUrl)) {
            return Promise.resolve(enhetFraUrl);
        }


        return hentAktivEnhet()
            .then((enhet) => {
                if (enhet == null || enhet === '') {
                    return Promise.resolve(enhetIdListe[0]);
                }
                return Promise.resolve(enhet);
            }).catch(() => Promise.resolve(enhetIdListe[0]));
    }

    oppdaterDekoratorMedInitiellEnhet() {
        const { velgEnhet, hentVeiledere } = this.props;
        this.finnInitiellEnhet().then((initiellEnhet) => {
            velgEnhet(initiellEnhet);
            leggEnhetIUrl(initiellEnhet);
            hentVeiledere(initiellEnhet);
            settEnhetIDekorator(initiellEnhet);
        });
    }

    render() {
        const { ledetekster = {}, enheter, children, veiledere } = this.props;

        return (
            <IntlProvider
                defaultLocale="nb"
                locale="nb"
                messages={mapTeksterTilNokkelDersomAngitt(ledetekster.data.nb)}
            >
                <div className="portefolje">
                    <Innholdslaster avhengigheter={[ledetekster, enheter, enheter.valgtEnhet, veiledere]}>
                        <FeatureToggle name="bruker_i_context">
                            <EnhetContext />
                        </FeatureToggle>
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
    hentTekster: PT.func.isRequired,
    velgEnhet: PT.func.isRequired,
    hentEnheter: PT.func.isRequired,
    hentVeiledere: PT.func.isRequired,
    ledetekster: PT.shape({
        status: PT.string.isRequired,
        data: PT.shape({ nb: PT.objectOf(PT.string).isRequired }).isRequired
    }).isRequired,
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
    side: state.ui.side.side,
    ledetekster: state.ledetekster,
    enheter: state.enheter,
    veiledere: state.veiledere
});

const mapDispatchToProps = (dispatch) => ({
    hentTekster: () => dispatch(hentLedetekster()),
    hentEnheter: (ident) => dispatch(hentEnheterForVeileder(ident)),
    hentVeiledere: (enhet) => dispatch(hentVeiledereForEnhet(enhet)),
    velgEnhet: (enhetid) => dispatch(velgEnhetForVeileder({ enhetId: enhetid })),
    settSide: (side) => dispatch(settSide(side))
});

export default connect(mapStateToProps, mapDispatchToProps)(Application);
