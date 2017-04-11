import React, { Component, PropTypes as PT } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Innholdslaster from '../innholdslaster/innholdslaster';
import {
    hentPortefoljeForEnhet,
    settSortering,
    nullstillFeilendeTilordninger
} from '../ducks/portefolje';
import { ytelseFilterErAktiv } from '../utils/utils';
import Paginering from '../paginering/paginering';
import EnhetsportefoljeTabell from './enhetsportefolje-tabell';
import { enhetShape, veilederShape, portefoljeShape, valgtEnhetShape, filtervalgShape } from '../proptype-shapes';
import { ytelsevalg } from '../filtrering/filter-konstanter';
import { ASCENDING, DESCENDING, DEFAULT_PAGINERING_STORRELSE } from '../konstanter';
import { diagramSkalVises } from './../minoversikt/diagram/util';
import Diagram from './../minoversikt/diagram/diagram';

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
            visningsmodus
        } = this.props;

        const { antallTotalt, antallReturnert, fraIndex } = portefolje.data;
        const visButtongroup = ytelseFilterErAktiv(filtervalg.ytelse) && filtervalg.ytelse !== ytelsevalg.AAP_UNNTAK;
        const visDiagram = diagramSkalVises(visningsmodus, filtervalg.ytelse);

        const pagineringTekst = (
            antallTotalt > 0 ?
                (<FormattedMessage
                    id="enhet.portefolje.paginering.tekst"
                    values={{ fraIndex: `${fraIndex + 1}`, tilIndex: fraIndex + antallReturnert, antallTotalt, visDiagram }}
                />) :
                (<FormattedMessage
                    id="enhet.portefolje.paginering.tekst"
                    values={{ fraIndex: '0', tilIndex: '0', antallTotalt: '0', visDiagram }}
                />)
        );

        const feil = portefolje.feilendeTilordninger;
        if (feil && feil.length > 0) {
            const fnr = feil.map((b) => b.brukerFnr).toString();
            /* eslint-disable no-undef, no-alert*/
            alert(`Tilordning av veileder feilet brukere med fnr:${fnr}`);
            clearFeilendeTilordninger();
        }


        const paginering = (
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
                visButtongroup={visButtongroup}
                visDiagram={visDiagram}
            />
        );

        return (
            <Innholdslaster avhengigheter={[portefolje, veiledere, { status: portefolje.tilordningerstatus }]}>
                {paginering}
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
                {antallTotalt >= 5 && paginering}
            </Innholdslaster>
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
    clearFeilendeTilordninger: () => dispatch(nullstillFeilendeTilordninger())
});

export default connect(mapStateToProps, mapDispatchToProps)(EnhetsportefoljeVisning);
