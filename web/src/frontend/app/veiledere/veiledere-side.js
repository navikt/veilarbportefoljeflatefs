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
import VeilederPaginering from '../paginering/veilederpaginering';
import Lenker from './../lenker/lenker';
import { settNySortering, settSubListeForPaginering } from '../ducks/veilederpaginering';
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
            veiledere, portefoljestorrelser, veiledereSomSkalVises, currentSortering, routes, settSortering
        } = this.props;
        const { veilederListe } = veiledere.data;
        const { facetResults } = portefoljestorrelser.data;

        const avgjorNySortering = (felt) => {
            if (currentSortering.felt === felt) {
                if (currentSortering.rekkefolge === 'descending') {
                    return { felt, rekkefolge: 'ascending' };
                }
                return { felt, rekkefolge: 'descending' };
            }
            return { felt, rekkefolge: 'ascending' };
        };

        const sorterPaaEtternavn =
            currentSortering === 'descending' ? veilederListe.sort(compareEtternavn).reverse() :
                veilederListe.sort(compareEtternavn);

        const sorterPaaPortefoljestorrelse = () => {
            const veiledereMedPortefoljestorrelser = veilederListe.map((veileder) => {
                console.log(facetResults);
                const portefoljestorrelse = facetResults.find(
                    (storrelse) => storrelse.value === veileder.ident
                );
                return { ...veileder, portefoljestorrelse };
            });
            return currentSortering === 'descending' ?
                veiledereMedPortefoljestorrelser.sort(compareEtternavn).reverse() :
                veiledereMedPortefoljestorrelser.sort(compareEtternavn);
        };

        const ferdigVeilederListe = () => {
            console.log(currentSortering.felt);
            console.log(currentSortering.rekkefolge);
            if (currentSortering.felt === 'ikke_satt') {
                return veilederListe;
            } else if (currentSortering.felt === 'etternavn') {
                return sorterPaaEtternavn;
            } else if (currentSortering.felt === 'portefoljestorrelse') {
                return sorterPaaPortefoljestorrelse();
            }
            return veilederListe;
        };

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
                    <VeilederPaginering
                        liste={ferdigVeilederListe()}
                        pagineringTekstId={
                            veilederListe.length > 0 ?
                                'enhet.veiledere.paginering.tekst' :
                                'enhet.veiledere.paginering.ingen.veiledere.tekst'
                        }
                    />
                    <VeiledereTabell
                        veiledere={veiledereSomSkalVises}
                        portefoljestorrelser={facetResults}
                        sorterPaaEtternavn={() => settSortering(avgjorNySortering('etternavn'))}
                        sorterPaaPortefoljestorrelse={() => settSortering(avgjorNySortering('portefoljestorrelse'))}
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
    settSortering: PT.func.isRequired,
    routes: PT.arrayOf(PT.object).isRequired,
    hentPortefoljestorrelser: PT.func.isRequired,
    currentSortering: PT.shape({
        felt: PT.string.isRequired,
        rekkefolge: PT.string.isRequired
    }).isRequired,
    valgtEnhet: valgtEnhetShape.isRequired
};

const mapStateToProps = (state) => ({
    veiledere: state.veiledere,
    valgtEnhet: state.enheter.valgtEnhet,
    veiledereSomSkalVises: state.veilederpaginering.subListe,
    portefoljestorrelser: state.portefoljestorrelser,
    currentSortering: state.veilederpaginering.currentSortering
});

const mapDispatchToProps = (dispatch) => ({
    hentPortefoljestorrelser: (enhetId) => dispatch(hentPortefoljeStorrelser(enhetId)),
    settSortering: (nySortering) => {
        dispatch(settNySortering(nySortering));
        dispatch(settSubListeForPaginering(0));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(VeiledereSide);

