import React, { PropTypes as PT, Component } from 'react';
import { connect } from 'react-redux';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { FormattedMessage } from 'react-intl';
import Lenker from './../lenker/lenker';
import { hentVeiledereForEnhet } from './../ducks/veiledere';
import TildelVeilederVelger from './tildel-veileder-velger';
import { veilederShape, brukerShape } from './../proptype-shapes';
import PortefoljeVisning from '../enhetsportefolje/portefolje-visning';
import FiltreringContainer from './filtrering/filtrering-container';
import { tildelVeileder } from '../ducks/portefolje';
import { eksporterEnhetsportefoljeTilLocalStorage } from '../ducks/utils';

class EnhetSide extends Component {
    componentWillMount() {
        const { valgtEnhet, hentVeiledere } = this.props;
        hentVeiledere(valgtEnhet.enhet.enhetId);
    }
    componentDidUpdate() {
        const { filtervalg, valgtEnhet } = this.props;
        eksporterEnhetsportefoljeTilLocalStorage(filtervalg, valgtEnhet.enhet, location.pathname);
    }
    render() {
        const {
            valgtEnhet,
            veiledere,
            valgtVeileder,
            velgVeileder,
            brukere,
            routes
        } = this.props;


        if (!valgtEnhet) {
            return <noscript />;
        }

        const tildelVeilederVelger =
            (<TildelVeilederVelger
                valgtVeileder={valgtVeileder}
                veiledere={veiledere}
                brukere={brukere}
                velgVeileder={(tildelinger, tilVeileder) => velgVeileder(tildelinger, tilVeileder)}
            />);

        return (
            <div className="enhet-side">
                <Lenker routes={routes} />
                <p className="typo-infotekst enhetsingress">
                    <FormattedMessage id="enhet.ingresstekst" />
                </p>
                <FiltreringContainer />
                <Ekspanderbartpanel
                    tittel="Tildel veileder" tittelProps={{
                        tag: 'span',
                        type: 'systemtittel'
                    }}
                >
                    {tildelVeilederVelger}
                </Ekspanderbartpanel>
                <PortefoljeVisning />
            </div>
        );
    }
}

EnhetSide.propTypes = {
    veiledere: PT.arrayOf(veilederShape).isRequired,
    brukere: PT.arrayOf(brukerShape).isRequired,
    routes: PT.arrayOf(PT.object),
    valgtEnhet: PT.object,
    filtervalg: PT.object,
    valgtVeileder: PT.object,
    velgVeileder: PT.func.isRequired,
    hentVeiledere: PT.func.isRequired
};

const mapStateToProps = state => ({
    veiledere: state.veiledere.data.veilederListe,
    brukere: state.portefolje.data.brukere,
    valgtVeileder: state.enheter.valgtVeileder,
    valgtEnhet: state.enheter.valgtEnhet,
    filtervalg: state.filtrering.filtervalg
});

const mapDispatchToProps = dispatch => ({
    velgVeileder: (tildelinger, tilVeileder) => dispatch(tildelVeileder(tildelinger, tilVeileder)),
    hentVeiledere: enhetId => dispatch(hentVeiledereForEnhet(enhetId))
});

export default connect(mapStateToProps, mapDispatchToProps)(EnhetSide);
