/* eslint-disable jsx-a11y/onclick-has-focus*/
/* eslint-disable jsx-a11y/onclick-has-role*/
/* eslint-disable jsx-a11y/no-static-element-interactions*/
import React, { Component, PropTypes as PT } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Innholdslaster from '../innholdslaster/innholdslaster';
import {
    hentPortefoljeForEnhet,
    settSorterRekkefolge,
    settBrukerSomMarkert,
    nullstillFeilendeTilordninger
} from '../ducks/portefolje';
import Paginering from '../paginering/paginering';
import EnhetsportefoljeTabell from './enhetsportefolje-tabell';
import { enhetShape, veilederShape, portefoljeShape } from '../proptype-shapes';

class EnhetsportefoljeVisning extends Component {
    componentWillMount() {
        const {
            valgtEnhet, hentPortefolje, sorteringsrekkefolge, fraIndex, antall, filtervalg
        } = this.props;
        hentPortefolje(
            valgtEnhet.enhet.enhetId,
            sorteringsrekkefolge,
            fraIndex,
            antall,
            filtervalg
        );
        this.settSorteringOgHentPortefolje = this.settSorteringOgHentPortefolje.bind(this);
    }

    settSorteringOgHentPortefolje() {
        const {
            sorteringsrekkefolge, settSortering, fraIndex, antall, valgtEnhet, hentPortefolje, filtervalg
        } = this.props;
        let valgtRekkefolge = '';
        if (sorteringsrekkefolge === 'ascending') {
            valgtRekkefolge = 'descending';
            settSortering('descending');
        } else {
            valgtRekkefolge = 'ascending';
            settSortering('ascending');
        }
        hentPortefolje(
            valgtEnhet.enhet.enhetId,
            valgtRekkefolge,
            fraIndex,
            antall,
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
            settMarkert,
            filtervalg,
            clearFeilendeTilordninger
        } = this.props;

        const { antallTotalt, antallReturnert, fraIndex } = portefolje.data;

        const pagineringTekst = (
            <FormattedMessage
                id="enhet.portefolje.paginering.tekst"
                values={{ fraIndex: `${fraIndex}`, tilIndex: fraIndex + antallReturnert, antallTotalt }}
            />
        );

        const feil = portefolje.feilendeTilordninger;
        if (feil && feil.length > 0) {
            const fnr = feil.map(b => b.brukerFnr).toString();
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
                            fra,
                            antall,
                            filtervalg
                        )}
                    tekst={pagineringTekst}
                    sideStorrelse={20}
                />
                <EnhetsportefoljeTabell
                    veiledere={veiledere.data.veilederListe}
                    brukere={portefolje.data.brukere}
                    settSorteringForPortefolje={this.settSorteringOgHentPortefolje}
                    settSomMarkert={settMarkert}
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
    fraIndex: PT.number,
    settMarkert: PT.func.isRequired,
    clearFeilendeTilordninger: PT.func.isRequired,
    antall: PT.number,
    filtervalg: PT.object
};

const mapStateToProps = state => ({
    portefolje: state.portefolje,
    valgtEnhet: state.enheter.valgtEnhet,
    veiledere: state.veiledere,
    sorteringsrekkefolge: state.portefolje.sorteringsrekkefolge,
    antall: state.paginering.sideStorrelse,
    filtervalg: state.filtrering.filtervalg
});

const mapDispatchToProps = dispatch => ({
    hentPortefolje: (enhet, rekkefolge, fra = 0, antall = 20, filtervalg) =>
        dispatch(hentPortefoljeForEnhet(enhet, rekkefolge, fra, antall, filtervalg)),
    settSortering: rekkefolge => dispatch(settSorterRekkefolge(rekkefolge)),
    settMarkert: (fnr, markert) => dispatch(settBrukerSomMarkert(fnr, markert)),
    clearFeilendeTilordninger: () => dispatch(nullstillFeilendeTilordninger())
});

export default connect(mapStateToProps, mapDispatchToProps)(EnhetsportefoljeVisning);
