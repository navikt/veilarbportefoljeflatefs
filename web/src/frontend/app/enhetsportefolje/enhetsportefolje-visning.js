import React, { Component, PropTypes as PT } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Innholdslaster from '../innholdslaster/innholdslaster';
import {
    hentPortefoljeForEnhet,
    settSortering,
    settBrukerSomMarkert,
    nullstillFeilendeTilordninger,
    PORTEFOLJE_SIDESTORRELSE
} from '../ducks/portefolje';
import Paginering from '../paginering/paginering';
import EnhetsportefoljeTabell from './enhetsportefolje-tabell';
import { enhetShape, veilederShape, portefoljeShape } from '../proptype-shapes';
import { ASCENDING, DESCENDING } from '../konstanter';

class EnhetsportefoljeVisning extends Component {
    componentWillMount() {
        const {
            valgtEnhet, hentPortefolje, sorteringsrekkefolge, sorteringsfelt, fraIndex, filtervalg
        } = this.props;
        hentPortefolje(
            valgtEnhet.enhet.enhetId,
            sorteringsrekkefolge,
            sorteringsfelt,
            fraIndex,
            PORTEFOLJE_SIDESTORRELSE,
            filtervalg
        );
        this.settSorteringOgHentPortefolje = this.settSorteringOgHentPortefolje.bind(this);
    }

    settSorteringOgHentPortefolje(felt) {
        const {
            sorteringsrekkefolge,
            sorteringsfelt,
            settSortering, // eslint-disable-line no-shadow
            fraIndex,
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

        let fra = fraIndex;
        let antallSkalHentes = PORTEFOLJE_SIDESTORRELSE;

        if (antallReturnert === antallTotalt) {
            fra = 0;
            antallSkalHentes = antallTotalt;
        }

        settSortering(valgtRekkefolge, felt);
        hentPortefolje(
            valgtEnhet.enhet.enhetId,
            valgtRekkefolge,
            felt,
            fra,
            antallSkalHentes,
            filtervalg
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
            settMarkert,
            filtervalg,
            clearFeilendeTilordninger
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
            /* eslint-disable no-undef, no-alert*/
            alert(`Tilordning av veileder feilet brukere med fnr:${fnr}`);
            clearFeilendeTilordninger();
        }

        return (
            <Innholdslaster avhengigheter={[portefolje, veiledere]}>
                <Paginering
                    antallTotalt={antallTotalt}
                    fraIndex={fraIndex}
                    hentListe={(fra, antall) =>
                        hentPortefolje(
                            valgtEnhet.enhet.enhetId,
                            sorteringsrekkefolge,
                            sorteringsfelt,
                            fra,
                            antall,
                            filtervalg
                        )}
                    tekst={pagineringTekst}
                    sideStorrelse={PORTEFOLJE_SIDESTORRELSE}
                    antallReturnert={antallReturnert}
                />
                <EnhetsportefoljeTabell
                    veiledere={veiledere.data.veilederListe}
                    brukere={portefolje.data.brukere}
                    settSorteringForPortefolje={this.settSorteringOgHentPortefolje}
                    settSomMarkert={settMarkert}
                    portefolje={portefolje}
                />
                <Paginering
                    antallTotalt={antallTotalt}
                    fraIndex={fraIndex}
                    hentListe={(fra, antall) =>
                        hentPortefolje(
                            valgtEnhet.enhet.enhetId,
                            sorteringsrekkefolge,
                            sorteringsfelt,
                            fra,
                            antall,
                            filtervalg
                        )}
                    tekst={antallTotalt > 0 ? pagineringTekst : null}
                    sideStorrelse={PORTEFOLJE_SIDESTORRELSE}
                    antallReturnert={antallReturnert}
                />
            </Innholdslaster>
        );
    }
}

EnhetsportefoljeVisning.propTypes = {
    valgtEnhet: PT.object.isRequired,
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
    fraIndex: PT.number,
    settMarkert: PT.func.isRequired,
    clearFeilendeTilordninger: PT.func.isRequired,
    filtervalg: PT.object
};

const mapStateToProps = (state) => ({
    portefolje: state.portefolje,
    valgtEnhet: state.enheter.valgtEnhet,
    veiledere: state.veiledere,
    sorteringsrekkefolge: state.portefolje.sorteringsrekkefolge,
    sorteringsfelt: state.portefolje.sorteringsfelt,
    filtervalg: state.filtrering
});

const mapDispatchToProps = (dispatch) => ({
    hentPortefolje: (enhet, rekkefolge, sorteringsfelt, fra = 0, antall = 20, filtervalg) =>
        dispatch(hentPortefoljeForEnhet(enhet, rekkefolge, sorteringsfelt, fra, antall, filtervalg)),
    settSortering: (rekkefolge, felt) => dispatch(settSortering(rekkefolge, felt)),
    settMarkert: (fnr, markert) => dispatch(settBrukerSomMarkert(fnr, markert)),
    clearFeilendeTilordninger: () => dispatch(nullstillFeilendeTilordninger())
});

export default connect(mapStateToProps, mapDispatchToProps)(EnhetsportefoljeVisning);
