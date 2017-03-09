import React, { Component, PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { veiledereShape, enhetShape, portefoljestorrelserShape, veilederShape } from './../proptype-shapes';
import VeiledereTabell from './veiledere-tabell';
import Innholdslaster from '../innholdslaster/innholdslaster';
import PagineringForvalter from '../paginering/pagineringforvalter';

class VeiledereSide extends Component {
    render() {
        const { veiledere, portefoljestorrelser, veiledereSomSkalVises } = this.props;
        const { veilederListe } = veiledere.data;
        const { facetResults } = portefoljestorrelser.data;

        return (
            <div className="veiledere-side panel">
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
    enhetsListe: PT.arrayOf(enhetShape).isRequired,
    velgEnhet: PT.func.isRequired,
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

export default connect(mapStateToProps)(VeiledereSide);

