import React, { Component, PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import Innholdslaster from '../innholdslaster/innholdslaster';
import {
    hentPortefoljeForVeileder,
    settSortering,
    nullstillFeilendeTilordninger,
    settTilordningStatusOk
} from '../ducks/portefolje';
import TabellOverskrift from './../components/tabell-overskrift';
import Toolbar from './../components/toolbar/toolbar';
import { enhetShape, veilederShape, filtervalgShape, feilmeldingModalShape } from './../proptype-shapes';
import { leggEnhetIUrl } from '../utils/utils';
import { ASCENDING, DESCENDING, DEFAULT_PAGINERING_STORRELSE } from '../konstanter';
import Diagram from './diagram/diagram';
import { diagramSkalVises } from './diagram/util';
import MinoversiktTabell from './minoversikt-portefolje-tabell';
import FeilmeldingBrukereModal from '../modal/feilmelding-brukere-modal';
import ServerFeilModal from '../modal/server-feil-modal';
import { STATUS } from '../ducks/utils';
import { LEGG_TIL_ARBEIDSLISTE_FEILET, skjulFeilmeldingModal, TILORDNING_FEILET } from '../ducks/modal-feilmelding';

class VeilederPortefoljeVisning extends Component {
    componentWillMount() {
        const {
            sorteringsrekkefolge,
            sorteringsfelt,
            hentPortefolje,
            valgtEnhet,
            gjeldendeVeileder,
            filtervalg
        } = this.props;

        hentPortefolje(
            valgtEnhet.enhet.enhetId, gjeldendeVeileder, sorteringsfelt, sorteringsrekkefolge, filtervalg
        );

        leggEnhetIUrl(valgtEnhet.enhet.enhetId);
        this.settSorteringOgHentPortefolje = this.settSorteringOgHentPortefolje.bind(this);
    }

    settSorteringOgHentPortefolje(felt) {
        const {
            sorteringsrekkefolge,
            sorteringsfelt,
            settSortering, // eslint-disable-line no-shadow
            hentPortefolje,
            gjeldendeVeileder,
            valgtEnhet,
            filtervalg
        } = this.props;
        let valgtRekkefolge = '';
        if (felt !== sorteringsfelt) {
            valgtRekkefolge = ASCENDING;
        } else {
            valgtRekkefolge = sorteringsrekkefolge === ASCENDING ? DESCENDING : ASCENDING;
        }
        settSortering(valgtRekkefolge, felt);
        hentPortefolje(
            valgtEnhet.enhet.enhetId, gjeldendeVeileder, valgtRekkefolge, felt, filtervalg
        );
    }

    render() {
        const {
            portefolje,
            hentPortefolje,
            gjeldendeVeileder,
            innloggetVeilederIdent,
            sorteringsrekkefolge,
            sorteringsfelt,
            valgtEnhet,
            clearTilordningFeil,
            filtervalg,
            visningsmodus,
            visesAnnenVeiledersPortefolje,
            closeFeilmeldingModal,
            feilmeldingModal
        } = this.props;

        const { antallTotalt, antallReturnert, fraIndex } = portefolje.data;
        const visDiagram = diagramSkalVises(visningsmodus, filtervalg.ytelse);

        const tilordningerStatus = portefolje.tilordningerstatus !== STATUS.RELOADING ? STATUS.OK : STATUS.RELOADING;
        return (
            <div className="portefolje__container">
                <Innholdslaster avhengigheter={[portefolje, { status: tilordningerStatus }]}>
                    <TabellOverskrift
                        fraIndex={fraIndex}
                        antallIVisning={antallReturnert}
                        antallTotalt={antallTotalt}
                        visDiagram={visDiagram}
                        tekst="enhet.portefolje.paginering.tekst"
                    />
                    <Toolbar
                        filtervalg={filtervalg}
                        onPaginering={(fra, antall) => hentPortefolje(
                            valgtEnhet.enhet.enhetId,
                            gjeldendeVeileder,
                            sorteringsrekkefolge,
                            sorteringsfelt,
                            filtervalg,
                            fra,
                            antall
                        )}
                        visesAnnenVeiledersPortefolje={visesAnnenVeiledersPortefolje}
                        sokVeilederSkalVises={false}
                    />
                    {
                        visDiagram ?
                            <Diagram
                                filtreringsvalg={filtervalg}
                                enhet={valgtEnhet.enhet.enhetId}
                                veileder={gjeldendeVeileder.ident}
                            />
                            :
                            <MinoversiktTabell
                                innloggetVeileder={innloggetVeilederIdent}
                                settSorteringOgHentPortefolje={this.settSorteringOgHentPortefolje}
                            />
                    }
                    <FeilmeldingBrukereModal
                        isOpen={feilmeldingModal.aarsak === TILORDNING_FEILET}
                        fnr={feilmeldingModal.brukereError}
                        onClose={closeFeilmeldingModal}
                        tittelTekstID="modal.tilordning.feilet.tittel"
                        infotekstTekstID="modal.tilordning.feilet.infotekst"
                    />
                    <FeilmeldingBrukereModal
                        isOpen={feilmeldingModal.aarsak === LEGG_TIL_ARBEIDSLISTE_FEILET}
                        fnr={feilmeldingModal.brukereError}
                        onClose={closeFeilmeldingModal}
                        tittelTekstID="modal.opprett.arbeidsliste.feilet.tittel"
                        infotekstTekstID="modal.opprett.arbeidsliste.feilet.infotekst"

                    />
                    <ServerFeilModal
                        isOpen={portefolje.tilordningerstatus === 'ERROR'}
                        clearTilordningFeil={clearTilordningFeil}
                    />
                </Innholdslaster>
            </div>
        );
    }

}

VeilederPortefoljeVisning.propTypes = {
    portefolje: PT.shape({
        data: PT.shape({
            brukere: PT.arrayOf(PT.object).isRequired,
            antallTotalt: PT.number.isRequired,
            antallReturnert: PT.number.isRequired,
            fraIndex: PT.number.isRequired
        }).isRequired,
        sorteringsrekkefolge: PT.string.isRequired
    }).isRequired,
    valgtEnhet: enhetShape.isRequired,
    gjeldendeVeileder: veilederShape.isRequired,
    innloggetVeilederIdent: PT.string.isRequired,
    hentPortefolje: PT.func.isRequired,
    settSortering: PT.func.isRequired,
    sorteringsrekkefolge: PT.string.isRequired,
    sorteringsfelt: PT.string.isRequired,
    closeFeilmeldingModal: PT.func.isRequired,
    clearTilordningFeil: PT.func.isRequired,
    visningsmodus: PT.string.isRequired,
    filtervalg: filtervalgShape.isRequired,
    visesAnnenVeiledersPortefolje: PT.bool.isRequired,
    feilmeldingModal: feilmeldingModalShape.isRequired
};

const mapStateToProps = (state) => ({
    portefolje: state.portefolje,
    valgtEnhet: state.enheter.valgtEnhet,
    sorteringsrekkefolge: state.portefolje.sorteringsrekkefolge,
    sorteringsfelt: state.portefolje.sorteringsfelt,
    visningsmodus: state.veilederpaginering.visningsmodus,
    filtervalg: state.filtreringMinoversikt,
    innloggetVeilederIdent: state.enheter.ident,
    feilmeldingModal: state.feilmeldingModal
});

const mapDispatchToProps = (dispatch) => ({
    hentPortefolje: (enhet, veileder, rekkefolge, felt, filtervalg, fra = 0, antall = 20) =>
        dispatch(hentPortefoljeForVeileder(enhet, veileder, rekkefolge, felt, fra, antall, filtervalg)),
    settSortering: (rekkefolge, felt) => dispatch(settSortering(rekkefolge, felt)),
    clearFeilendeTilordninger: () => dispatch(nullstillFeilendeTilordninger()),
    clearTilordningFeil: () => dispatch(settTilordningStatusOk()),
    closeFeilmeldingModal: () => dispatch(skjulFeilmeldingModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(VeilederPortefoljeVisning);
