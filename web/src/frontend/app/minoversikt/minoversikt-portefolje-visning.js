import React, { Component, PropTypes as PT } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Innholdslaster from '../innholdslaster/innholdslaster';
import { hentPortefoljeForVeileder, settSortering, nullstillFeilendeTilordninger } from '../ducks/portefolje';
import Paginering from '../paginering/paginering';
import { enhetShape, veilederShape, filtervalgShape } from './../proptype-shapes';
import { leggEnhetIUrl, ytelseFilterErAktiv } from '../utils/utils';
import { ASCENDING, DESCENDING, DEFAULT_PAGINERING_STORRELSE } from '../konstanter';
import Diagram from './diagram/diagram';
import { diagramSkalVises } from './diagram/util';
import { ytelsevalg } from '../filtrering/filter-konstanter';
import MinoversiktTabell from './minoversikt-portefolje-tabell';

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
            filtervalg,
            visningsmodus
        } = this.props;

        const { antallTotalt, antallReturnert, fraIndex } = portefolje.data;


        const pagineringTekst = (
            antallTotalt > 0 ?
                (<FormattedMessage
                    id="enhet.portefolje.paginering.tekst"
                    values={{ fraIndex: `${fraIndex + 1}`, tilIndex: fraIndex + antallReturnert, antallTotalt }}
                />) :
                (<FormattedMessage
                    id="enhet.portefolje.paginering.tekst"
                    values={{ fraIndex: '0', tilIndex: '0', antallTotalt: '0' }}
                />)
        );

        const feil = portefolje.feilendeTilordninger;
        if (feil && feil.length > 0) {
            const fnr = feil.map((b) => b.brukerFnr).toString();
            // TODO en alert???
            alert(`Tilordning av veileder feilet brukere med fnr:${fnr}`); // eslint-disable-line no-undef
            clearFeilendeTilordninger();
        }

        const visDiagram = diagramSkalVises(visningsmodus, filtervalg.ytelse);
        const visButtonGroup = ytelseFilterErAktiv(filtervalg.ytelse) && filtervalg.ytelse !== ytelsevalg.AAP_UNNTAK;

        return (
            <Innholdslaster avhengigheter={[portefolje]}>
                <Paginering
                    antallTotalt={antallTotalt}
                    antallReturnert={antallReturnert}
                    fraIndex={fraIndex}
                    hentListe={(fra, antall) =>
                        hentPortefolje(valgtEnhet.enhet.enhetId, veileder,
                            sorteringsfelt, sorteringsrekkefolge, filtervalg, antall, fra)}
                    tekst={pagineringTekst}
                    sideStorrelse={DEFAULT_PAGINERING_STORRELSE}
                    visButtongroup={visButtonGroup}
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
            </Innholdslaster>
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
    visningsmodus: PT.string.isRequired,
    filtervalg: filtervalgShape.isRequired
};

const mapStateToProps = (state) => ({
    portefolje: state.portefolje,
    valgtEnhet: state.enheter.valgtEnhet,
    sorteringsrekkefolge: state.portefolje.sorteringsrekkefolge,
    sorteringsfelt: state.portefolje.sorteringsfelt,
    visningsmodus: state.veilederpaginering.visningsmodus,
    filtervalg: state.filtreringVeileder
});

const mapDispatchToProps = (dispatch) => ({
    hentPortefolje: (enhet, ident, felt, rekkefolge, filtervalg, antall = 20, fra = 0) =>
        dispatch(hentPortefoljeForVeileder(enhet, ident, rekkefolge, felt, fra, antall, filtervalg)),
    settSortering: (rekkefolge, felt) => dispatch(settSortering(rekkefolge, felt)),
    clearFeilendeTilordninger: () => dispatch(nullstillFeilendeTilordninger())
});

export default connect(mapStateToProps, mapDispatchToProps)(VeilederPortefoljeVisning);
