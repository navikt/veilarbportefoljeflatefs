import React, { Component, PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { veilederShape, enhetShape } from './../proptype-shapes';
import VeiledereTabell from './veiledere-tabell';
import { hentVeiledereForEnhet } from './../ducks/veiledere';
import Innholdslaster from '../innholdslaster/innholdslaster';
import { velgEnhetForVeileder } from './../ducks/enheter';
import EnhetVelger from './../enhet/enhet-velger';
import Paginering from '../utils/paginering';

class VeiledereSide extends Component {

    componentWillMount() {
        this.props.hentVeiledere(this.props.valgtEnhet.enhetId, 0, 20);
    }

    render() {
        const { veiledere, enhetsListe, valgtEnhet, hentVeiledere, velgEnhet } = this.props;
        const { veilederListe, totaltAntallVeiledere, sublistFraIndex } = veiledere.data;

        const pagineringTekst = (
            <FormattedMessage
                id="enhet.veiledere.paginering.tekst"
                values={{
                    fraIndex: `${sublistFraIndex}`,
                    tilIndex: sublistFraIndex + veilederListe.length,
                    antallTotalt: totaltAntallVeiledere
                }}
            />
        );

        return (
            <div className="veiledere-side panel">
                <EnhetVelger
                    enheter={enhetsListe} valgtEnhet={valgtEnhet} velgEnhet={(enhet) => {
                        velgEnhet(enhet);
                        hentVeiledere(enhet.enhetId, 0, 20);
                    }}
                />
                <Innholdslaster avhengigheter={[veiledere]}>
                    <Paginering
                        antallTotalt={totaltAntallVeiledere}
                        fraIndex={sublistFraIndex}
                        hentListe={(fra, antall) =>
                            hentVeiledere(valgtEnhet.enhetId, fra, antall)}
                        tekst={pagineringTekst}
                    />
                    <VeiledereTabell veiledere={veilederListe} />
                </Innholdslaster>
            </div>
        );
    }
}

VeiledereSide.propTypes = {
    veiledere: PT.shape({
        data: PT.shape({
            enhet: enhetShape.isRequired,
            veilederListe: PT.arrayOf(veilederShape).isRequired,
            totaltAntallVeiledere: PT.number.isRequired,
            sublistFraIndex: PT.number.isRequired
        }).isRequired
    }).isRequired,
    hentVeiledere: PT.func.isRequired,
    enhetsListe: PT.arrayOf(enhetShape).isRequired,
    valgtEnhet: enhetShape.isRequired,
    velgEnhet: PT.func.isRequired
};

const mapStateToProps = state => ({
    veiledere: state.veiledere,
    enhetsListe: state.enheter.data,
    valgtEnhet: state.enheter.valgtEnhet
});

const mapDispatchToProps = dispatch => ({
    hentVeiledere: (enhetId, fra, antall) => dispatch(hentVeiledereForEnhet(enhetId, fra, antall)),
    velgEnhet: enhet => dispatch(velgEnhetForVeileder(enhet))
});

export default connect(mapStateToProps, mapDispatchToProps)(VeiledereSide);

