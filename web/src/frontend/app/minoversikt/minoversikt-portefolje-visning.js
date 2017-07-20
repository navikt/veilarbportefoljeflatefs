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
import { enhetShape, veilederShape, filtervalgShape } from './../proptype-shapes';
import { leggEnhetIUrl } from '../utils/utils';
import { ASCENDING, DESCENDING, DEFAULT_PAGINERING_STORRELSE } from '../konstanter';
import Diagram from './diagram/diagram';
import { diagramSkalVises } from './diagram/util';
import MinoversiktTabell from './minoversikt-portefolje-tabell';
import TilordningFeiletModal from '../modal/tilordning-feilet-modal';
import ServerFeilModal from '../modal/server-feil-modal';
import { STATUS } from '../ducks/utils';

class VeilederPortefoljeVisning extends Component {
    componentWillMount() {
        const {
            sorteringsrekkefolge,
            sorteringsfelt,
            hentPortefolje,
            valgtEnhet,
            veileder,
            filtervalg
        } = this.props;

        hentPortefolje(
            valgtEnhet.enhet.enhetId, veileder, sorteringsfelt, sorteringsrekkefolge, filtervalg
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
            veileder,
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
            valgtEnhet.enhet.enhetId, veileder, felt, valgtRekkefolge, filtervalg
        );
    }

    render() {
        const {
            portefolje,
            hentPortefolje,
            veileder,
            sorteringsrekkefolge,
            sorteringsfelt,
            valgtEnhet,
            clearFeilendeTilordninger,
            clearTilordningFeil,
            filtervalg,
            visningsmodus,
            visesAnnenVeiledersPortefolje
        } = this.props;

        const { antallTotalt, antallReturnert, fraIndex } = portefolje.data;
        const visDiagram = diagramSkalVises(visningsmodus, filtervalg.ytelse);

        let fnr = [];
        const feil = portefolje.feilendeTilordninger;
        if (feil && feil.length > 0) {
            fnr = feil.map((b) => b.brukerFnr);
        }

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
                                veileder={veileder.ident}
                            />
                            :
                            <MinoversiktTabell
                                veileder={veileder}
                                settSorteringOgHentPortefolje={this.settSorteringOgHentPortefolje}
                            />
                    }
                    <TilordningFeiletModal
                        isOpen={portefolje.feilendeTilordninger && portefolje.feilendeTilordninger.length > 0}
                        fnr={fnr}
                        clearFeilendeTilordninger={clearFeilendeTilordninger}
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
    veileder: veilederShape.isRequired,
    hentPortefolje: PT.func.isRequired,
    settSortering: PT.func.isRequired,
    sorteringsrekkefolge: PT.string.isRequired,
    sorteringsfelt: PT.string.isRequired,
    clearFeilendeTilordninger: PT.func.isRequired,
    clearTilordningFeil: PT.func.isRequired,
    visningsmodus: PT.string.isRequired,
    filtervalg: filtervalgShape.isRequired,
    visesAnnenVeiledersPortefolje: PT.bool.isRequired
};

const mapStateToProps = (state) => ({
    portefolje: state.portefolje,
    valgtEnhet: state.enheter.valgtEnhet,
    sorteringsrekkefolge: state.portefolje.sorteringsrekkefolge,
    sorteringsfelt: state.portefolje.sorteringsfelt,
    visningsmodus: state.veilederpaginering.visningsmodus,
    filtervalg: state.filtreringMinoversikt
});

const mapDispatchToProps = (dispatch) => ({
    hentPortefolje: (enhet, ident, felt, rekkefolge, filtervalg, antall = 20, fra = 0) =>
        dispatch(hentPortefoljeForVeileder(enhet, ident, rekkefolge, felt, fra, antall, filtervalg)),
    settSortering: (rekkefolge, felt) => dispatch(settSortering(rekkefolge, felt)),
    clearFeilendeTilordninger: () => dispatch(nullstillFeilendeTilordninger()),
    clearTilordningFeil: () => dispatch(settTilordningStatusOk())
});

export default connect(mapStateToProps, mapDispatchToProps)(VeilederPortefoljeVisning);
