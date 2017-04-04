import React, { Component, PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Undertittel } from 'nav-frontend-typografi';
import { veiledereShape, portefoljestorrelserShape, veilederShape, valgtEnhetShape } from './../proptype-shapes';
import VeiledereTabell from './veiledere-tabell';
import Innholdslaster from '../innholdslaster/innholdslaster';
import VeilederPaginering from '../paginering/veilederpaginering';
import Lenker from './../lenker/lenker';
import {
    sorterListePaaPortefoljestorrelse,
    settSubListeForPaginering,
    sorterListePaaEtternavn
} from '../ducks/veilederpaginering';
import { hentPortefoljeStorrelser } from '../ducks/portefoljestorrelser';
import { leggEnhetIUrl } from '../utils/utils';
import { ASCENDING, DESCENDING } from '../konstanter';

class VeiledereSide extends Component {
    componentWillMount() {
        const { hentPortefoljestorrelser, valgtEnhet } = this.props;
        hentPortefoljestorrelser(valgtEnhet.enhet.enhetId);
        leggEnhetIUrl(valgtEnhet.enhet.enhetId);
    }

    render() {
        const {
            veiledere, portefoljestorrelser, veiledereSomSkalVises, currentSortering,
            routes, sorterPaaPortefoljestorrelse, sorterPaaEtternavn
        } = this.props;
        const { veilederListe } = veiledere.data;
        const { facetResults } = portefoljestorrelser.data;

        const avgjorNySortering = (felt) => {
            if (currentSortering.felt === felt) {
                if (currentSortering.rekkefolge === DESCENDING) {
                    return { felt, rekkefolge: ASCENDING };
                }
                return { felt, rekkefolge: DESCENDING };
            }
            return { felt, rekkefolge: ASCENDING };
        };
        const veiledereMedPortefoljestorrelser = (veilederListeParam, portefoljestorrelserParam) =>
            veilederListeParam.map((veileder) => {
                const portefoljestorrelse = portefoljestorrelserParam.find(
                    (storrelse) => storrelse.value === veileder.ident);
                const count = portefoljestorrelse ? portefoljestorrelse.count : 0;
                return { ...veileder, portefoljestorrelse: count };
            });
        return (
            <div className="veiledere-side">
                <Lenker routes={routes} />
                <p className="typo-infotekst enhetsingress">
                    <FormattedMessage id="enhet.ingresstekst.veilederoversikt" />
                </p>
                <Undertittel tag="h1" type="undertittel" className="veiledere-undertittel">
                    <FormattedMessage
                        id="enhet.veiledere.tittel"
                        values={{ antallVeiledere: veilederListe.length }}
                    />
                </Undertittel>
                <Innholdslaster avhengigheter={[veiledere, portefoljestorrelser]}>
                    {() => (
                        <div>
                            <VeilederPaginering
                                liste={veiledereMedPortefoljestorrelser(veilederListe, facetResults)}
                                pagineringTekstId={
                                    veilederListe.length > 0 ?
                                        'enhet.veiledere.paginering.tekst' :
                                        'enhet.veiledere.paginering.ingen.veiledere.tekst'
                                }
                            />
                            <VeiledereTabell
                                veiledere={veiledereSomSkalVises}
                                sorterPaaEtternavn={() => sorterPaaEtternavn(avgjorNySortering('etternavn'))}
                                sorterPaaPortefoljestorrelse={
                                    () => sorterPaaPortefoljestorrelse(avgjorNySortering('portefoljestorrelse'))
                                }
                            />
                        </div>
                    )}
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
    sorterPaaPortefoljestorrelse: PT.func.isRequired,
    routes: PT.arrayOf(PT.object).isRequired,
    hentPortefoljestorrelser: PT.func.isRequired,
    currentSortering: PT.shape({
        felt: PT.string.isRequired,
        rekkefolge: PT.string.isRequired
    }).isRequired,
    valgtEnhet: valgtEnhetShape.isRequired,
    sorterPaaEtternavn: PT.func.isRequired
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
    sorterPaaPortefoljestorrelse: (nySortering) => {
        dispatch(sorterListePaaPortefoljestorrelse(nySortering));
        dispatch(settSubListeForPaginering(0));
    },
    sorterPaaEtternavn: (nySortering) => {
        dispatch(sorterListePaaEtternavn(nySortering));
        dispatch(settSubListeForPaginering(0));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(VeiledereSide);
