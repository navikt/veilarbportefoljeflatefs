import React, { PropTypes as PT, Component } from 'react';
import { connect } from 'react-redux';
import TildelVeilederVelger from './tildel-veileder-velger';
import { veilederShape, brukerShape } from './../proptype-shapes';
import PortefoljeVisning from '../enhetsportefolje/portefolje-visning';
import { tildelVeileder } from '../ducks/portefolje';
import { hentVeiledereForEnhet } from '../ducks/veiledere';

import FiltreringOversikt from './filtrering/filtrering-oversikt';

class EnhetSide extends Component {
    componentWillMount() {
        const { valgtEnhet, hentVeiledere } = this.props;
        hentVeiledere(valgtEnhet.enhet.enhetId);
    }
    render() {
        const {
            valgtEnhet,
            veiledere,
            valgtVeileder,
            velgVeileder,
            brukere
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
            <div className="enhet-side panel">
                <FiltreringOversikt />
                {tildelVeilederVelger}
                <PortefoljeVisning />
            </div>
        );
    }
}

EnhetSide.propTypes = {
    veiledere: PT.arrayOf(veilederShape).isRequired,
    brukere: PT.arrayOf(brukerShape).isRequired,
    valgtEnhet: PT.object,
    valgtVeileder: PT.object,
    velgVeileder: PT.func.isRequired,
    hentVeiledere: PT.func.isRequired
};

const mapStateToProps = state => ({
    veiledere: state.veiledere.data.veilederListe,
    brukere: state.portefolje.data.brukere,
    valgtVeileder: state.enheter.valgtVeileder,
    valgtEnhet: state.enheter.valgtEnhet
});

const mapDispatchToProps = dispatch => ({
    velgVeileder: (tildelinger, tilVeileder) => dispatch(tildelVeileder(tildelinger, tilVeileder)),
    hentVeiledere: enhetId => dispatch(hentVeiledereForEnhet(enhetId))
});

export default connect(mapStateToProps, mapDispatchToProps)(EnhetSide);
