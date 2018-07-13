import * as React from 'react';
import { connect } from 'react-redux';
import Innholdslaster from '../innholdslaster/innholdslaster';
import { hentPortefoljeForVeileder, PortefoljeState, settSortering } from '../ducks/portefolje';
import TabellOverskrift from './../components/tabell-overskrift';
import Toolbar from './../components/toolbar/toolbar';
import { enhetShape, veilederShape, filtervalgShape, feilmeldingModalShape } from './../proptype-shapes';
import { leggEnhetIUrl, getSideFromUrl } from '../utils/url-utils';
import { ASCENDING, DESCENDING } from '../konstanter';
import Diagram from './diagram/diagram';
import { diagramSkalVises } from './diagram/util';
import MinoversiktTabell from './minoversikt-portefolje-tabell';
import FeilmeldingBrukereModal from '../modal/feilmelding-brukere-modal';
import ServerFeilModal from '../modal/server-feil-modal';
import { STATUS } from '../ducks/utils';
import {
    skjulFeilmeldingModal,
    FJERN_FRA_ARBEIDSLISTE_FEILET,
    LEGG_TIL_ARBEIDSLISTE_FEILET,
    TILORDNING_FEILET
} from '../ducks/modal-feilmelding-brukere';
import { skjulServerfeilModal } from '../ducks/modal-serverfeil';
import { FeilmeldingModalModell, FiltervalgModell, ValgtEnhetModell, VeilederModell } from '../model-interfaces';
import { ListevisningType } from '../ducks/ui/listevisning';
import { InjectedIntlProps, injectIntl } from 'react-intl';

interface VeilederPortefoljeVisningProps {
    portefolje: PortefoljeState;
    sorteringsrekkefolge: string;
    valgtEnhet: ValgtEnhetModell;
    gjeldendeVeileder: VeilederModell;
    innloggetVeilederIdent: string;
    hentPortefolje: (...args) => void;
    doSettSortering: (rekkefolge: string, felt: string) => void;
    sorteringsfelt: string;
    closeFeilmeldingModal: () => void;
    visningsmodus: string;
    filtervalg: FiltervalgModell;
    visesAnnenVeiledersPortefolje: boolean;
    feilmeldingModal: FeilmeldingModalModell;
    serverfeilModalSkalVises: boolean;
    closeServerfeilModal: () => void;
}

class VeilederPortefoljeVisning extends React.Component<VeilederPortefoljeVisningProps & InjectedIntlProps> {
    componentWillMount() {
        const {
            valgtEnhet,
        } = this.props;

        leggEnhetIUrl(valgtEnhet.enhet!.enhetId!);
        this.settSorteringOgHentPortefolje = this.settSorteringOgHentPortefolje.bind(this);
    }

    settSorteringOgHentPortefolje(felt) {
        const {
            sorteringsrekkefolge,
            sorteringsfelt,
            doSettSortering,
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
        doSettSortering(valgtRekkefolge, felt);
        hentPortefolje(
            valgtEnhet.enhet!.enhetId, gjeldendeVeileder.ident, valgtRekkefolge, felt, filtervalg
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
            filtervalg,
            visningsmodus,
            visesAnnenVeiledersPortefolje,
            closeFeilmeldingModal,
            feilmeldingModal,
            serverfeilModalSkalVises,
            closeServerfeilModal,
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
                        filtergruppe={ListevisningType.minOversikt}
                        onPaginering={(fra, antall) => hentPortefolje(
                            valgtEnhet.enhet!.enhetId,
                            gjeldendeVeileder.ident,
                            sorteringsrekkefolge,
                            sorteringsfelt,
                            filtervalg
                        )}
                        gjeldendeVeileder={gjeldendeVeileder}
                        visesAnnenVeiledersPortefolje={visesAnnenVeiledersPortefolje}
                        sokVeilederSkalVises={false}
                        visningsmodus={visningsmodus}
                        antallTotalt={antallTotalt}
                    />
                    {
                        visDiagram ?
                            <Diagram
                                filtreringsvalg={filtervalg}
                                enhet={valgtEnhet.enhet!.enhetId}
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
                    <FeilmeldingBrukereModal
                        isOpen={feilmeldingModal.aarsak === FJERN_FRA_ARBEIDSLISTE_FEILET}
                        fnr={feilmeldingModal.brukereError}
                        onClose={closeFeilmeldingModal}
                        tittelTekstID="modal.fjern.arbeidsliste.feilet.tittel"
                        infotekstTekstID="modal.fjern.arbeidsliste.feilet.infotekst"

                    />
                    <ServerFeilModal
                        isOpen={serverfeilModalSkalVises}
                        onClose={closeServerfeilModal}
                    />
                </Innholdslaster>
            </div>
        );
    }

}

const mapStateToProps = (state) => ({
    portefolje: state.portefolje,
    valgtEnhet: state.enheter.valgtEnhet,
    sorteringsrekkefolge: state.portefolje.sorteringsrekkefolge,
    sorteringsfelt: state.portefolje.sorteringsfelt,
    visningsmodus: state.paginering.visningsmodus,
    filtervalg: state.filtreringMinoversikt,
    innloggetVeilederIdent: state.enheter.ident,
    feilmeldingModal: state.feilmeldingModal,
    serverfeilModalSkalVises: state.serverfeilModal.modalVises,
});

const mapDispatchToProps = (dispatch) => ({
    hentPortefolje: (enhet, veileder, rekkefolge, felt, filtervalg) =>
        dispatch(hentPortefoljeForVeileder(enhet, veileder, rekkefolge, felt, filtervalg)),
    doSettSortering: (rekkefolge, felt) => dispatch(settSortering(rekkefolge, felt)),
    closeFeilmeldingModal: () => dispatch(skjulFeilmeldingModal()),
    closeServerfeilModal: () => dispatch(skjulServerfeilModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(VeilederPortefoljeVisning);
