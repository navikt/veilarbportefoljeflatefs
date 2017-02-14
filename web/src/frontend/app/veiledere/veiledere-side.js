import React, { Component, PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { veiledereShape, enhetShape, portefoljestorrelserShape } from './../proptype-shapes';
import VeiledereTabell from './veiledere-tabell';
import { hentVeiledereForEnhet } from './../ducks/veiledere';
import { hentPortefoljeStorrelser } from './../ducks/portefoljestorrelser';
import Innholdslaster from '../innholdslaster/innholdslaster';
import { velgEnhetForVeileder } from './../ducks/enheter';
import EnhetVelger from './../enhet/enhet-velger';
import Paginering from '../utils/paginering';

class VeiledereSide extends Component {

    componentWillMount() {
        this.props.hentVeiledere(this.props.valgtEnhet.enhetId, 0, 20);
        this.props.hentPortefoljestorrelser(this.props.valgtEnhet.enhetId);
    }

    render() {
        const { veiledere, enhetsListe, valgtEnhet,
            hentVeiledere, velgEnhet, portefoljestorrelser, hentPortefoljestorrelser } = this.props;
        const { veilederListe, totaltAntallVeiledere, sublistFraIndex } = veiledere.data;
        const { facetResults } = portefoljestorrelser.data;

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
                        hentPortefoljestorrelser(enhet.enhetId);
                    }}
                />
                <Innholdslaster avhengigheter={[veiledere, portefoljestorrelser]}>
                    <Paginering
                        antallTotalt={totaltAntallVeiledere}
                        fraIndex={sublistFraIndex}
                        hentListe={(fra, antall) =>
                            hentVeiledere(valgtEnhet.enhetId, fra, antall)}
                        tekst={pagineringTekst}
                    />
                    <VeiledereTabell veiledere={veilederListe} portefoljestorrelser={facetResults} />
                </Innholdslaster>
            </div>
        );
    }
}

VeiledereSide.propTypes = {
    veiledere: PT.shape({
        data: veiledereShape.isRequired
    }).isRequired,
    hentVeiledere: PT.func.isRequired,
    enhetsListe: PT.arrayOf(enhetShape).isRequired,
    valgtEnhet: enhetShape.isRequired,
    velgEnhet: PT.func.isRequired,
    hentPortefoljestorrelser: PT.func.isRequired,
    portefoljestorrelser: PT.shape({
        data: portefoljestorrelserShape.isRequired
    }).isRequired
};

const mapStateToProps = state => ({
    veiledere: state.veiledere,
    enhetsListe: state.enheter.data,
    valgtEnhet: state.enheter.valgtEnhet,
    portefoljestorrelser: state.portefoljestorrelser
});

const mapDispatchToProps = dispatch => ({
    hentVeiledere: (enhetId, fra, antall) => dispatch(hentVeiledereForEnhet(enhetId, fra, antall)),
    velgEnhet: enhet => dispatch(velgEnhetForVeileder(enhet)),
    hentPortefoljestorrelser: enhetId => dispatch(hentPortefoljeStorrelser(enhetId))
});

export default connect(mapStateToProps, mapDispatchToProps)(VeiledereSide);

