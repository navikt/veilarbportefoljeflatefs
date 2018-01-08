import * as React from 'react';
import { connect } from 'react-redux';
import Innholdslaster from '../innholdslaster/innholdslaster';
import { hentPortefoljeForEnhet, settSortering } from '../ducks/portefolje';
import Toolbar from './../components/toolbar/toolbar';
import { getSideFromUrl } from '../utils/url-utils';
import EnhetTabell from './enhetsportefolje-tabell';
import TabellOverskrift from './../components/tabell-overskrift';
import {
    enhetShape,
    filtervalgShape,
    portefoljeShape,
    valgtEnhetShape,
    veilederShape,
    feilmeldingModalShape
} from '../proptype-shapes';
import { ASCENDING, DEFAULT_PAGINERING_STORRELSE, DESCENDING } from '../konstanter';
import { diagramSkalVises } from './../minoversikt/diagram/util';
import Diagram from './../minoversikt/diagram/diagram';
import VelgfilterMelding from './velg-filter-melding';
import ServerFeilModal from '../modal/server-feil-modal';
import { STATUS } from '../ducks/utils';
import { skjulServerfeilModal } from '../ducks/modal-serverfeil';
import FeilmeldingBrukereModal from '../modal/feilmelding-brukere-modal';
import { skjulFeilmeldingModal, TILORDNING_FEILET } from '../ducks/modal-feilmelding-brukere';
import { FeilmeldingModalModell, FiltervalgModell, ValgtEnhetModell } from '../model-interfaces';
import { ListevisningType } from '../ducks/ui/listevisning';
import { InjectedIntlProps, injectIntl } from 'react-intl';

function antallFilter(filtervalg) {
    function mapAktivitetFilter(value) {
        return Object.entries(value).map(([_, verdi]) => {
            if (verdi === 'NA') return 0;
            return 1;
        }).reduce((a, b) => a + b, 0);
    }

    return Object.entries(filtervalg)
        .map(([filter, value]) => {
            if (value === true) return 1;
            else if (Array.isArray(value)) return value.length;
            else if (filter === 'aktiviteter') return mapAktivitetFilter(value);
            else if (typeof value === 'object') return value ? Object.entries(value).length : 0;
            else if (value) return 1;
            return 0;
        }).reduce((a, b) => a + b, 0);
}

interface EnhetsportefoljeVisningProps {
    valgtEnhet: ValgtEnhetModell;
    portefolje: any;
    hentPortefolje: (enhetid: string | undefined, sorteringsrekkefolge: string, sorteringsfelt: string, filtervalg: FiltervalgModell, fraIndex: number, anstall?: number) => any;
    veiledere: any;
    doSettSortering: (sorteringsrekkefolge: string, felt: string) => void;
    sorteringsrekkefolge: string;
    sorteringsfelt: string;
    filtervalg: FiltervalgModell;
    visningsmodus: string;
    serverfeilModalSkalVises: boolean;
    closeServerfeilModal: () => void;
    feilmeldingModal: FeilmeldingModalModell;
    closeFeilmeldingModal: () => void;
    veilederpaginering: string;
}

class EnhetsportefoljeVisning extends React.Component<EnhetsportefoljeVisningProps & InjectedIntlProps> {
    componentWillMount() {
        const {
            valgtEnhet, hentPortefolje, sorteringsrekkefolge, sorteringsfelt, filtervalg
        } = this.props;
        const side = getSideFromUrl();
        const fraIndex = side === '' ? 0 : (side - 1) * 20;

        hentPortefolje(
            valgtEnhet.enhet!.enhetId,
            sorteringsrekkefolge,
            sorteringsfelt,
            filtervalg,
            fraIndex
        );
        this.settSorteringOgHentPortefolje = this.settSorteringOgHentPortefolje.bind(this);
    }

    settSorteringOgHentPortefolje(felt) {
        const {
            sorteringsrekkefolge,
            sorteringsfelt,
            doSettSortering,
            valgtEnhet,
            hentPortefolje,
            filtervalg
        } = this.props;
        const {antallReturnert, antallTotalt} = this.props.portefolje.data;

        let valgtRekkefolge = '';

        if (felt !== sorteringsfelt) {
            valgtRekkefolge = ASCENDING;
        } else {
            valgtRekkefolge = sorteringsrekkefolge === ASCENDING ? DESCENDING : ASCENDING;
        }

        const antallSkalHentes = antallReturnert === antallTotalt ? antallTotalt : DEFAULT_PAGINERING_STORRELSE;

        doSettSortering(valgtRekkefolge, felt);
        hentPortefolje(
            valgtEnhet.enhet!.enhetId,
            valgtRekkefolge,
            felt,
            filtervalg,
            0,
            antallSkalHentes
        );
    }

    render() {
        const {
            portefolje,
            valgtEnhet,
            veiledere,
            hentPortefolje,
            sorteringsrekkefolge,
            sorteringsfelt,
            filtervalg,
            visningsmodus,
            serverfeilModalSkalVises,
            closeServerfeilModal,
            feilmeldingModal,
            closeFeilmeldingModal,
            veilederpaginering,
            intl
        } = this.props;

        const {antallTotalt, antallReturnert, fraIndex} = portefolje.data;
        const visDiagram = diagramSkalVises(visningsmodus, filtervalg.ytelse, intl);

        const harFilter = antallFilter(filtervalg) !== 0;
        if (!harFilter) {
            return <VelgfilterMelding/>;
        }

        const tilordningerStatus = portefolje.tilordningerstatus !== STATUS.RELOADING ? STATUS.OK : STATUS.RELOADING;

        return (
            <div className="portefolje__container">
                <Innholdslaster avhengigheter={[portefolje, veiledere, {status: tilordningerStatus}]}>
                    <TabellOverskrift
                        fraIndex={fraIndex}
                        antallIVisning={antallReturnert}
                        antallTotalt={antallTotalt}
                        visDiagram={visDiagram}
                        tekst="enhet.portefolje.paginering.tekst"
                    />
                    <Toolbar
                        filtergruppe={ListevisningType.enhetensOversikt}
                        onPaginering={(fra, antall) => hentPortefolje(
                            valgtEnhet.enhet!.enhetId,
                            sorteringsrekkefolge,
                            sorteringsfelt,
                            filtervalg,
                            fra,
                            antall
                        )}
                        sokVeilederSkalVises
                        veilederpaginering={veilederpaginering}
                    />
                    {
                        visDiagram ?
                            <Diagram filtreringsvalg={filtervalg} enhet={valgtEnhet.enhet!.enhetId}/> :
                            <EnhetTabell
                                veiledere={veiledere.data.veilederListe}
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
    veiledere: state.veiledere,
    sorteringsrekkefolge: state.portefolje.sorteringsrekkefolge,
    sorteringsfelt: state.portefolje.sorteringsfelt,
    filtervalg: state.filtrering,
    visningsmodus: state.veilederpaginering.visningsmodus,
    serverfeilModalSkalVises: state.serverfeilModal.modalVises,
    feilmeldingModal: state.feilmeldingModal,
    veilederpaginering: state.veilederpaginering.visningsmodus
});

const mapDispatchToProps = (dispatch) => ({
    hentPortefolje: (enhet, rekkefolge, sorteringsfelt, filtervalg, fra = 0, antall = 20) =>
        dispatch(hentPortefoljeForEnhet(enhet, rekkefolge, sorteringsfelt, filtervalg, fra, antall)),
    doSettSortering: (rekkefolge, felt) => dispatch(settSortering(rekkefolge, felt)),
    closeServerfeilModal: () => dispatch(skjulServerfeilModal()),
    closeFeilmeldingModal: () => dispatch(skjulFeilmeldingModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(EnhetsportefoljeVisning));
