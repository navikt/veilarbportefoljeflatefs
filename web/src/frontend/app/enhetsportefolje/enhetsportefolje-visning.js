import React, { Component, PropTypes as PT } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Innholdslaster from '../innholdslaster/innholdslaster';
import {
    hentPortefoljeForEnhet,
    nullstillFeilendeTilordninger,
    settTilordningStatusOk,
    settSortering
} from '../ducks/portefolje';
import { ytelseFilterErAktiv } from '../utils/utils';
import Paginering from '../paginering/paginering';
import EnhetsportefoljeTabell from './enhetsportefolje-tabell';
import { enhetShape, filtervalgShape, portefoljeShape, valgtEnhetShape, veilederShape } from '../proptype-shapes';
import { ytelsevalg } from '../filtrering/filter-konstanter';
import { ASCENDING, DEFAULT_PAGINERING_STORRELSE, DESCENDING } from '../konstanter';
import { diagramSkalVises } from './../minoversikt/diagram/util';
import Diagram from './../minoversikt/diagram/diagram';
import VelgfilterMelding from './velg-filter-melding';
import TilordningFeiletModal from '../modal/tilordning-feilet-modal';
import ServerFeilModal from '../modal/server-feil-modal';
import { STATUS } from '../ducks/utils';

function antallFilter(filtervalg) {
    return Object.entries(filtervalg)
        .map(([_, value]) => {
            if (value === true) return 1;
            else if (Array.isArray(value)) return value.length;
            else if (value) return 1;
            return 0;
        }).reduce((a, b) => a + b, 0);
}

class EnhetsportefoljeVisning extends Component {
    componentWillMount() {
        const {
            valgtEnhet, hentPortefolje, sorteringsrekkefolge, sorteringsfelt, filtervalg
        } = this.props;
        hentPortefolje(
            valgtEnhet.enhet.enhetId,
            sorteringsrekkefolge,
            sorteringsfelt,
            filtervalg
        );
        this.settSorteringOgHentPortefolje = this.settSorteringOgHentPortefolje.bind(this);
    }

    settSorteringOgHentPortefolje(felt) {
        const {
            sorteringsrekkefolge,
            sorteringsfelt,
            settSortering, // eslint-disable-line no-shadow
            valgtEnhet,
            hentPortefolje,
            filtervalg
        } = this.props;
        const { antallReturnert, antallTotalt } = this.props.portefolje.data;

        let valgtRekkefolge = '';

        if (felt !== sorteringsfelt) {
            valgtRekkefolge = ASCENDING;
        } else {
            valgtRekkefolge = sorteringsrekkefolge === ASCENDING ? DESCENDING : ASCENDING;
        }

        const antallSkalHentes = antallReturnert === antallTotalt ? antallTotalt : DEFAULT_PAGINERING_STORRELSE;

        settSortering(valgtRekkefolge, felt);
        hentPortefolje(
            valgtEnhet.enhet.enhetId,
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
            clearFeilendeTilordninger,
            clearTilordningFeil,
            visningsmodus
        } = this.props;

        const { antallTotalt, antallReturnert, fraIndex } = portefolje.data;
        const visButtongroup = ytelseFilterErAktiv(filtervalg.ytelse) && filtervalg.ytelse !== ytelsevalg.AAP_UNNTAK;
        const visDiagram = diagramSkalVises(visningsmodus, filtervalg.ytelse);

        const pagineringTekst = (
            antallTotalt > 0 ?
                (<FormattedMessage
                    id="enhet.portefolje.paginering.tekst"
                    values={{
                        fraIndex: `${fraIndex + 1}`,
                        tilIndex: fraIndex + antallReturnert,
                        antallTotalt,
                        visDiagram
                    }}
                />) :
                (<FormattedMessage
                    id="enhet.portefolje.paginering.tekst"
                    values={{ fraIndex: '0', tilIndex: '0', antallTotalt: '0', visDiagram }}
                />)
        );

        let fnr = [];
        const feil = portefolje.feilendeTilordninger;
        if (feil && feil.length > 0) {
            fnr = feil.map((b) => b.brukerFnr);
        }


        const paginering = (visDiagramknapper) => (
            <Paginering
                antallTotalt={antallTotalt}
                fraIndex={fraIndex}
                hentListe={(fra, antall) =>
                    hentPortefolje(
                        valgtEnhet.enhet.enhetId,
                        sorteringsrekkefolge,
                        sorteringsfelt,
                        filtervalg,
                        fra,
                        antall
                    )}
                tekst={pagineringTekst}
                sideStorrelse={DEFAULT_PAGINERING_STORRELSE}
                antallReturnert={antallReturnert}
                visButtongroup={visDiagramknapper}
                visDiagram={visDiagram}
            />
        );

        const harFilter = antallFilter(filtervalg) !== 0;

        const content = harFilter ? (
            <div>
                {paginering(visButtongroup)}
                {
                    visDiagram ?
                        <Diagram filtreringsvalg={filtervalg} enhet={valgtEnhet.enhet.enhetId} /> :
                        <EnhetsportefoljeTabell
                            veiledere={veiledere.data.veilederListe}
                            brukere={portefolje.data.brukere}
                            settSorteringForPortefolje={this.settSorteringOgHentPortefolje}
                            portefolje={portefolje}
                        />
                }
                {(antallTotalt >= 5 && !visDiagram) && paginering(false)}
                <TilordningFeiletModal
                    isOpen={portefolje.feilendeTilordninger && portefolje.feilendeTilordninger.length > 0}
                    fnr={fnr}
                    clearFeilendeTilordninger={clearFeilendeTilordninger}
                />
                <ServerFeilModal
                    isOpen={portefolje.tilordningerstatus === 'ERROR'}
                    clearTilordningFeil={clearTilordningFeil}
                />
            </div>
        ) : (
            <VelgfilterMelding />
        );

        const tilordningerStatus = portefolje.tilordningerstatus !== STATUS.RELOADING ? STATUS.OK : STATUS.RELOADING;

        return (
            <div className="portefolje__container">
                <Innholdslaster avhengigheter={[portefolje, veiledere, { status: tilordningerStatus }]}>
                    {content}
                </Innholdslaster>
            </div>
        );
    }
}

EnhetsportefoljeVisning.propTypes = {
    valgtEnhet: valgtEnhetShape.isRequired,
    portefolje: PT.shape({
        data: portefoljeShape.isRequired,
        sorteringsrekkefolge: PT.string.isRequired
    }).isRequired,
    hentPortefolje: PT.func.isRequired,
    veiledere: PT.shape({
        data: PT.shape({
            enhet: enhetShape.isRequired,
            veilederListe: PT.arrayOf(veilederShape).isRequired
        }).isRequired
    }).isRequired,
    settSortering: PT.func.isRequired,
    sorteringsrekkefolge: PT.string.isRequired,
    sorteringsfelt: PT.string.isRequired,
    clearFeilendeTilordninger: PT.func.isRequired,
    clearTilordningFeil: PT.func.isRequired,
    filtervalg: filtervalgShape.isRequired,
    visningsmodus: PT.string.isRequired
};

const mapStateToProps = (state) => ({
    portefolje: state.portefolje,
    valgtEnhet: state.enheter.valgtEnhet,
    veiledere: state.veiledere,
    sorteringsrekkefolge: state.portefolje.sorteringsrekkefolge,
    sorteringsfelt: state.portefolje.sorteringsfelt,
    filtervalg: state.filtrering,
    visningsmodus: state.veilederpaginering.visningsmodus
});

const mapDispatchToProps = (dispatch) => ({
    hentPortefolje: (enhet, rekkefolge, sorteringsfelt, filtervalg, fra = 0, antall = 20) =>
        dispatch(hentPortefoljeForEnhet(enhet, rekkefolge, sorteringsfelt, fra, antall, filtervalg)),
    settSortering: (rekkefolge, felt) => dispatch(settSortering(rekkefolge, felt)),
    clearFeilendeTilordninger: () => dispatch(nullstillFeilendeTilordninger()),
    clearTilordningFeil: () => dispatch(settTilordningStatusOk())
});

export default connect(mapStateToProps, mapDispatchToProps)(EnhetsportefoljeVisning);
