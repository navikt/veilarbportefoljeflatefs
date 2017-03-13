import React, { PropTypes as PT, Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import TildelVeilederVelger from './tildel-veileder-velger';
import { enhetShape, veilederShape, brukerShape } from './../proptype-shapes';
import PortefoljeVisning from '../enhetsportefolje/portefolje-visning';
import { tildelVeileder } from '../ducks/portefolje';
import { hentVeiledereForEnhet } from '../ducks/veiledere';


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
            brukere,
            enheter
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
                <h1 className="typo-innholdstittel">
                    <FormattedMessage
                        id="enhet.valgt.tittel"
                        values={{ enhetId: valgtEnhet.enhet.enhetId,
                            enhetnavn: valgtEnhet.enhet.navn ?
                                valgtEnhet.enhet.navn :
                                enheter.find(enhet => enhet.enhetId === valgtEnhet.enhet.enhetId).navn }}
                    /></h1>
                <p className="typo-infotekst">
                    <FormattedMessage
                        id="enhet.valgt.infotekst"
                        values={{ enhetId: valgtEnhet.enhet.enhetId,
                            enhetnavn: valgtEnhet.enhet.navn ?
                                valgtEnhet.enhet.navn :
                                enheter.find(enhet => enhet.enhetId === valgtEnhet.enhet.enhetId).navn }}
                    />
                </p>
                {tildelVeilederVelger}
                <PortefoljeVisning />
            </div>
        );
    }
}

EnhetSide.propTypes = {
    enheter: PT.arrayOf(enhetShape).isRequired,
    veiledere: PT.arrayOf(veilederShape).isRequired,
    brukere: PT.arrayOf(brukerShape).isRequired,
    valgtEnhet: PT.object,
    valgtVeileder: PT.object,
    velgVeileder: PT.func.isRequired,
    hentVeiledere: PT.func.isRequired
};

const mapStateToProps = state => ({
    enheter: state.enheter.data,
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
