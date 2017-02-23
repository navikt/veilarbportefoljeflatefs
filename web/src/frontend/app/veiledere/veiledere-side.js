import React, { Component, PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { veiledereShape, enhetShape, portefoljestorrelserShape, veilederShape } from './../proptype-shapes';
import VeiledereTabell from './veiledere-tabell';
import { hentVeiledereForEnhet } from './../ducks/veiledere';
import { hentPortefoljeStorrelser } from './../ducks/portefoljestorrelser';
import Innholdslaster from '../innholdslaster/innholdslaster';
import { velgEnhetForVeileder } from './../ducks/enheter';
import EnhetVelger from './../enhet/enhet-velger';
import PagineringForvalter from '../paginering/pagineringforvalter';

class VeiledereSide extends Component {

    componentWillMount() {
        this.props.hentVeiledere(this.props.valgtEnhet.enhetId);
        this.props.hentPortefoljestorrelser(this.props.valgtEnhet.enhetId);
    }

    render() {
        const { veiledere, enhetsListe, valgtEnhet, hentVeiledere, velgEnhet, portefoljestorrelser,
            hentPortefoljestorrelser, veiledereSomSkalVises } = this.props;
        const { veilederListe } = veiledere.data;
        const { facetResults } = portefoljestorrelser.data;

        return (
            <div className="veiledere-side panel">
                <EnhetVelger
                    enheter={enhetsListe} valgtEnhet={valgtEnhet} velgEnhet={(enhet) => {
                        velgEnhet(enhet);
                        hentVeiledere(enhet.enhetId);
                        hentPortefoljestorrelser(enhet.enhetId);
                    }}
                />
                <Innholdslaster avhengigheter={[veiledere, portefoljestorrelser]}>
                    <PagineringForvalter
                        liste={veilederListe}
                        pagineringTekstId="enhet.veiledere.paginering.tekst"
                    />
                    <VeiledereTabell veiledere={veiledereSomSkalVises} portefoljestorrelser={facetResults} />
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
    }).isRequired,
    veiledereSomSkalVises: PT.arrayOf(veilederShape).isRequired
};

const mapStateToProps = state => ({
    veiledere: state.veiledere,
    enhetsListe: state.enheter.data,
    valgtEnhet: state.enheter.valgtEnhet,
    veiledereSomSkalVises: state.paginering.subListe,
    portefoljestorrelser: state.portefoljestorrelser
});

const mapDispatchToProps = dispatch => ({
    hentVeiledere: enhetId => dispatch(hentVeiledereForEnhet(enhetId)),
    velgEnhet: enhet => dispatch(velgEnhetForVeileder(enhet)),
    hentPortefoljestorrelser: enhetId => dispatch(hentPortefoljeStorrelser(enhetId))
});

export default connect(mapStateToProps, mapDispatchToProps)(VeiledereSide);

