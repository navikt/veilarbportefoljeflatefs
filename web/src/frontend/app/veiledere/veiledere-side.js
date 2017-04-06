import React, { Component, PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Undertittel } from 'nav-frontend-typografi';
import DocumentTitle from 'react-document-title';
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
import {
    sorterListePaaPortefoljestorrelse,
    settSubListeForPaginering,
    sorterListePaaEtternavn
} from '../ducks/veilederpaginering';
import { hentPortefoljeStorrelser } from '../ducks/portefoljestorrelser';
import { leggEnhetIUrl } from '../utils/utils';
import { ASCENDING, DESCENDING } from '../konstanter';
import { visAlleVeiledereIListe } from './veiledersok-utils';
import Dropdown from '../components/dropdown/dropdown';
import { resetSokeresultater, settVeilederfiltervalg, settVeiledereITabell } from '../ducks/veiledere';
import CheckboxFilterform from '../components/checkbox-filterform/checkbox-filterform';
import VeiledereSokeliste from './veiledersok';

class VeiledereSide extends Component {
    componentWillMount() {
        const { hentPortefoljestorrelser, valgtEnhet } = this.props;
        hentPortefoljestorrelser(valgtEnhet.enhet.enhetId);
        leggEnhetIUrl(valgtEnhet.enhet.enhetId);
        this.veilederfiltreringOnSubmit = this.veilederfiltreringOnSubmit.bind(this);
    }

    veilederfiltreringOnSubmit(name, veilederfiltervalg) {
        const { settFiltervalgForVeiledere, veiledere, settVeiledereSomSkalVises } = this.props;
        settFiltervalgForVeiledere(veilederfiltervalg);
        settVeiledereSomSkalVises(veilederfiltervalg
            .map((ident) => veiledere.data.veilederListe.find((veileder) => veileder.ident === ident)));
    }

    render() {
        const {
            veiledere, portefoljestorrelser, veiledereSomSkalVises, currentSortering,
            sorterPaaPortefoljestorrelse, sorterPaaEtternavn, resetSok
        } = this.props;
        const { veilederListe } = veiledere.data;
        const { veiledereITabell, sokeresultat, veilederfiltervalg } = veiledere;
        const { facetResults } = portefoljestorrelser.data;
        const { formatMessage } = this.props.intl;
        const veiledereTilTabell = veiledereITabell || veiledereSomSkalVises;

        const veiledervalg = sokeresultat.sokIkkeStartet ?
            visAlleVeiledereIListe(veiledere.data.veilederListe) :
            sokeresultat;

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
            <DocumentTitle title={formatMessage({id: 'lenker.veiledere.oversikt'})}>
                <div className="veiledere-side">
                    <Lenker />
                    <div id="oversikt-sideinnhold" role="tabpanel">
                        <p className="typo-infotekst begrensetbredde blokk-m">
                            <FormattedMessage id="enhet.ingresstekst.veilederoversikt"/>
                        </p>
                        <Undertittel tag="h1" type="undertittel" className="veiledere-undertittel">
                            <FormattedMessage
                                id="enhet.veiledere.tittel"
                                values={{antallVeiledere: veilederListe.length}}
                            />
                        </Undertittel>
                        <Innholdslaster avhengigheter={[veiledere, portefoljestorrelser]}>
                            {() => (
                                <div>
                                    <div className="veiledersok__wrapper">
                                        <Dropdown name="Velg veileder" onLukk={resetSok}>
                                            <VeiledereSokeliste
                                                veiledere={veilederListe}
                                            />
                                            <CheckboxFilterform
                                                form="veiledervisning"
                                                valg={veiledervalg}
                                                filtervalg={{veiledervisning: veilederfiltervalg}}
                                                onSubmit={(...args) => this.veilederfiltreringOnSubmit(...args)}
                                            />
                                        </Dropdown>
                                    </div>
                                    <VeilederPaginering
                                        liste={veiledereMedPortefoljestorrelser(veilederListe, facetResults)}
                                        pagineringTekstId={'enhet.veiledere.paginering.tekst'}
                                    />
                                    <VeiledereTabell
                                        veiledere={veiledereTilTabell}
                                        sorterPaaEtternavn={() => sorterPaaEtternavn(avgjorNySortering('etternavn'))}
                                        sorterPaaPortefoljestorrelse={
                                            () => sorterPaaPortefoljestorrelse(avgjorNySortering('portefoljestorrelse'))
                                        }
                                    />
                                </div>
                            )}
                        </Innholdslaster>
                    </div>
                </div>
            </DocumentTitle>
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
    hentPortefoljestorrelser: PT.func.isRequired,
    currentSortering: PT.shape({
        felt: PT.string.isRequired,
        rekkefolge: PT.string.isRequired
    }).isRequired,
    valgtEnhet: valgtEnhetShape.isRequired,
    sorterPaaEtternavn: PT.func.isRequired,
    settFiltervalgForVeiledere: PT.func.isRequired,
    settVeiledereSomSkalVises: PT.func.isRequired,
    resetSok: PT.func.isRequired,
    intl: intlShape.isRequired
};

const mapStateToProps = (state) => ({
    veiledere: state.veiledere,
    valgtEnhet: state.enheter.valgtEnhet,
    veiledereSomSkalVises: state.veilederpaginering.subListe,
    portefoljestorrelser: state.portefoljestorrelser,
    currentSortering: state.veilederpaginering.currentSortering
});

const mapDispatchToProps = (dispatch) => ({
    resetSok: () => dispatch(resetSokeresultater()),
    hentPortefoljestorrelser: (enhetId) => dispatch(hentPortefoljeStorrelser(enhetId)),
    sorterPaaPortefoljestorrelse: (nySortering) => {
        dispatch(sorterListePaaPortefoljestorrelse(nySortering));
        dispatch(settSubListeForPaginering(0));
    },
    sorterPaaEtternavn: (nySortering) => {
        dispatch(sorterListePaaEtternavn(nySortering));
        dispatch(settSubListeForPaginering(0));
    },
    settFiltervalgForVeiledere: (veilederfiltervalg) => dispatch(settVeilederfiltervalg(veilederfiltervalg)),
    settVeiledereSomSkalVises: (veiledere) => dispatch(settVeiledereITabell(veiledere))
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(VeiledereSide));
