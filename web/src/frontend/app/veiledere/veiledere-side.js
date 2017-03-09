import React, { Component, PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { veiledereShape, enhetShape, portefoljestorrelserShape, veilederShape } from './../proptype-shapes';
import VeiledereTabell from './veiledere-tabell';
import Innholdslaster from '../innholdslaster/innholdslaster';
import PagineringForvalter from '../paginering/pagineringforvalter';
import { settSorteringRekkefolge, settSubListeForPaginering } from '../ducks/paginering';

export function compareEtternavn(a, b) {
    const aUpper = a.etternavn.toUpperCase();
    const bUpper = b.etternavn.toUpperCase();
    if (aUpper < bUpper) {
        return -1;
    }
    if (aUpper > bUpper) {
        return 1;
    }
    return 0;
}

class VeiledereSide extends Component {
    render() {
        const { veiledere, portefoljestorrelser, veiledereSomSkalVises, sorterPaaEtternavn,
            currentSorteringsRekkefolge } = this.props;
        const { veilederListe } = veiledere.data;
        const { facetResults } = portefoljestorrelser.data;

        return (
            <div className="veiledere-side panel">
                <Innholdslaster avhengigheter={[veiledere, portefoljestorrelser]}>
                    <PagineringForvalter
                        liste={veilederListe}
                        pagineringTekstId="enhet.veiledere.paginering.tekst"
                    />
                    <VeiledereTabell
                        veiledere={veiledereSomSkalVises}
                        portefoljestorrelser={facetResults}
                        sorterPaaEtternavn={() => sorterPaaEtternavn(compareEtternavn,
                            currentSorteringsRekkefolge === 'ascending' ? 'descending' : 'ascending')}
                    />
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
    veiledereSomSkalVises: PT.arrayOf(veilederShape).isRequired,
    sorterPaaEtternavn: PT.func.isRequired,
    currentSorteringsRekkefolge: PT.string.isRequired
};

const mapStateToProps = state => ({
    veiledere: state.veiledere,
    enhetsListe: state.enheter.data,
    valgtEnhet: state.enheter.valgtEnhet,
    veiledereSomSkalVises: state.paginering.subListe,
    portefoljestorrelser: state.portefoljestorrelser,
    currentSorteringsRekkefolge: state.paginering.sorteringsRekkefolge
});

const mapDispatchToProps = dispatch => ({
    velgEnhet: enhet => dispatch(velgEnhetForVeileder(enhet)),
    sorterPaaEtternavn: (sorteringsFunksjon, sorteringsRekkefolge) => {
        dispatch(settSorteringRekkefolge(sorteringsFunksjon, sorteringsRekkefolge));
        dispatch(settSubListeForPaginering(0));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(VeiledereSide);

