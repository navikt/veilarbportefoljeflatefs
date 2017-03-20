import React, { Component, PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import {
    veiledereShape,
    portefoljestorrelserShape,
    veilederShape,
    valgtEnhetShape
} from './../proptype-shapes';
import VeiledereTabell from './veiledere-tabell';
import Innholdslaster from '../innholdslaster/innholdslaster';
import PagineringForvalter from '../paginering/pagineringforvalter';
import Lenker from './../lenker/lenker';
import { settSorteringRekkefolge, settSubListeForPaginering } from '../ducks/paginering';
import { hentVeiledereForEnhet } from '../ducks/veiledere';
import { hentPortefoljeStorrelser } from '../ducks/portefoljestorrelser';

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
    componentWillMount() {
        const { hentVeiledere, hentPortefoljestorrelser, valgtEnhet } = this.props;
        hentVeiledere(valgtEnhet.enhet.enhetId);
        hentPortefoljestorrelser(valgtEnhet.enhet.enhetId);
    }
    render() {
        const { veiledere, portefoljestorrelser, veiledereSomSkalVises, sorterPaaEtternavn,
            currentSorteringsRekkefolge, routes } = this.props;
        const { veilederListe } = veiledere.data;
        const { facetResults } = portefoljestorrelser.data;

        return (
            <div className="veiledere-side panel">
                <Lenker routes={routes} />
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
    portefoljestorrelser: PT.shape({
        data: portefoljestorrelserShape.isRequired
    }).isRequired,
    veiledereSomSkalVises: PT.arrayOf(veilederShape).isRequired,
    sorterPaaEtternavn: PT.func.isRequired,
    routes: PT.arrayOf(PT.object),
    hentVeiledere: PT.func.isRequired,
    hentPortefoljestorrelser: PT.func.isRequired,
    currentSorteringsRekkefolge: PT.string.isRequired,
    valgtEnhet: valgtEnhetShape.isRequired
};

const mapStateToProps = state => ({
    veiledere: state.veiledere,
    valgtEnhet: state.enheter.valgtEnhet,
    veiledereSomSkalVises: state.paginering.subListe,
    portefoljestorrelser: state.portefoljestorrelser,
    currentSorteringsRekkefolge: state.paginering.sorteringsRekkefolge
});

const mapDispatchToProps = dispatch => ({
    hentVeiledere: enhetId => dispatch(hentVeiledereForEnhet(enhetId)),
    hentPortefoljestorrelser: enhetId => dispatch(hentPortefoljeStorrelser(enhetId)),
    sorterPaaEtternavn: (sorteringsFunksjon, sorteringsRekkefolge) => {
        dispatch(settSorteringRekkefolge(sorteringsFunksjon, sorteringsRekkefolge));
        dispatch(settSubListeForPaginering(0));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(VeiledereSide);

