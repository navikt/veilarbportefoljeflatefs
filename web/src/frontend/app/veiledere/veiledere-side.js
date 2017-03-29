import React, { Component, PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Undertittel } from 'nav-frontend-typografi';
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
import { hentPortefoljeStorrelser } from '../ducks/portefoljestorrelser';
import { leggEnhetIUrl } from '../utils/utils';

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
        const { hentPortefoljestorrelser, valgtEnhet } = this.props;
        hentPortefoljestorrelser(valgtEnhet.enhet.enhetId);
        leggEnhetIUrl(valgtEnhet.enhet.enhetId);
    }

    render() {
        const {
            veiledere, portefoljestorrelser, veiledereSomSkalVises, sorterPaaEtternavn,
            currentSorteringsRekkefolge, routes
        } = this.props;
        const { veilederListe } = veiledere.data;
        const { facetResults } = portefoljestorrelser.data;

        return (
            <div className="veiledere-side">
                <Lenker routes={routes} />
                <p className="typo-infotekst enhetsingress">
                    <FormattedMessage id="enhet.ingresstekst" />
                </p>
                <Undertittel tag="h1" type="undertittel" className="veiledere-undertittel">
                    <FormattedMessage
                        id="enhet.veiledere.tittel"
                        values={{ antallVeiledere: veilederListe.length }}
                    />
                </Undertittel>
                <Innholdslaster avhengigheter={[veiledere, portefoljestorrelser]}>
                    <PagineringForvalter
                        liste={veilederListe}
                        pagineringTekstId={
                            veilederListe.length > 0 ?
                                'enhet.veiledere.paginering.tekst' :
                                'enhet.veiledere.paginering.ingen.veiledere.tekst'
                        }
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
    hentPortefoljestorrelser: PT.func.isRequired,
    currentSorteringsRekkefolge: PT.string.isRequired,
    valgtEnhet: valgtEnhetShape.isRequired
};

const mapStateToProps = (state) => ({
    veiledere: state.veiledere,
    valgtEnhet: state.enheter.valgtEnhet,
    veiledereSomSkalVises: state.paginering.subListe,
    portefoljestorrelser: state.portefoljestorrelser,
    currentSorteringsRekkefolge: state.paginering.sorteringsRekkefolge
});

const mapDispatchToProps = (dispatch) => ({
    hentVeiledere: (enhetId) => dispatch(hentVeiledereForEnhet(enhetId)),
    hentPortefoljestorrelser: (enhetId) => dispatch(hentPortefoljeStorrelser(enhetId)),
    sorterPaaEtternavn: (sorteringsFunksjon, sorteringsRekkefolge) => {
        dispatch(settSorteringRekkefolge(sorteringsFunksjon, sorteringsRekkefolge));
        dispatch(settSubListeForPaginering(0));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(VeiledereSide);

