import React, { Component, PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { IntlProvider, addLocaleData } from 'react-intl';
import nb from 'react-intl/locale-data/nb';
import queryString from 'query-string';
import { hentLedetekster } from './ducks/ledetekster';
import DevTools from './devtools';
import { hentEnheterForVeileder, velgEnhetForVeileder } from './ducks/enheter';
import Innholdslaster from './innholdslaster/innholdslaster';
import rendreDekorator, { settEnhetIDekorator } from './eventhandtering';
import { STATUS } from './ducks/utils';
import { leggEnhetIUrl } from './utils/utils';
import { hentVeiledereForEnhet } from './ducks/veiledere';
import history from './history';
import { enhetShape, valgtEnhetShape, veiledereShape } from './proptype-shapes';

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
    }

    finnInitiellEnhet() {
        const { enheter, hentVeiledere } = this.props;

        const enhetliste = enheter.data;
        const enhetFraUrl = queryString.parse(location.search).enhet;// eslint-disable-line no-undef
        const initiellEnhet = enhetliste
            .map((enhet) => (enhet.enhetId))
            .includes(enhetFraUrl) ? enhetFraUrl : enhetliste[0].enhetId;

        leggEnhetIUrl(initiellEnhet);
        hentVeiledere(initiellEnhet);
        return initiellEnhet;
    }

    oppdaterDekoratorMedInitiellEnhet() {
        const { velgEnhet } = this.props;
        const initiellEnhet = this.finnInitiellEnhet();
        velgEnhet(initiellEnhet);
        settEnhetIDekorator(initiellEnhet);
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
                        <div className="container maincontent side-innhold">
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
    children: PT.oneOfType([PT.arrayOf(PT.node), PT.node]).isRequired,
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
        sokeresultat: PT.shape({ sokIkkeStartet: PT.bool.isRequired }).isRequired,
        veilederfiltervalg: PT.arrayOf(PT.string).isRequired,
        veiledereITabell: PT.arrayOf(veiledereShape)
    }).isRequired
};

const mapStateToProps = (state) => ({
    ledetekster: state.ledetekster,
    enheter: state.enheter,
    veiledere: state.veiledere
});

const mapDispatchToProps = (dispatch) => ({
    hentTekster: () => dispatch(hentLedetekster()),
    hentEnheter: (ident) => dispatch(hentEnheterForVeileder(ident)),
    hentVeiledere: (enhet) => dispatch(hentVeiledereForEnhet(enhet)),
    velgEnhet: (enhetid) => dispatch(velgEnhetForVeileder({ enhetId: enhetid }))
});

export default connect(mapStateToProps, mapDispatchToProps)(Application);
