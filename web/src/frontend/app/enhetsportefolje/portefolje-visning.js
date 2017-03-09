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
import PortefoljeTabell from './portefolje-tabell';
import { enhetShape, veilederShape, portefoljeShape } from '../proptype-shapes';

class PortefoljeVisning extends Component {
    componentWillMount() {
        this.settSorteringOgHentPortefolje = this.settSorteringOgHentPortefolje.bind(this);
    }

    settSorteringOgHentPortefolje() {
        const { sorteringsrekkefolge, settSortering, fraIndex, valgtEnhet, hentPortefolje } = this.props;
        let valgtRekkefolge = '';
        if (sorteringsrekkefolge === 'ascending') {
            valgtRekkefolge = 'descending';
            settSortering('descending');
        } else {
            valgtRekkefolge = 'ascending';
            settSortering('ascending');
        }
        hentPortefolje(valgtEnhet.enhetId, valgtRekkefolge, fraIndex);
    }

    render() {
        const {
            portefolje,
            valgtEnhet,
            veiledere,
            hentPortefolje,
            sorteringsrekkefolge,
            settMarkert,
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
                        hentPortefolje(valgtEnhet.enhetId, sorteringsrekkefolge, fra, antall)}
                    tekst={pagineringTekst}
                    sideStorrelse={20}
                />
                <PortefoljeTabell
                    veiledere={veiledere.data.veilederListe}
                    brukere={portefolje.data.brukere}
                    settSorteringForPortefolje={this.settSorteringOgHentPortefolje}
                    settSomMarkert={settMarkert}
                />
            </Innholdslaster>
        );
    }
}

PortefoljeVisning.propTypes = {
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
    clearFeilendeTilordninger: PT.func.isRequired
};

const mapStateToProps = state => ({
    portefolje: state.portefolje,
    valgtEnhet: state.enheter.valgtEnhet,
    veiledere: state.veiledere,
    sorteringsrekkefolge: state.portefolje.sorteringsrekkefolge
});

const mapDispatchToProps = dispatch => ({
    hentPortefolje: (enhet, rekkefolge, fra = 0, antall = 20) =>
        dispatch(hentPortefoljeForEnhet(enhet, rekkefolge, fra, antall)),
    settSortering: rekkefolge => dispatch(settSorterRekkefolge(rekkefolge)),
    settMarkert: (fnr, markert) => dispatch(settBrukerSomMarkert(fnr, markert)),
    clearFeilendeTilordninger: () => dispatch(nullstillFeilendeTilordninger())
});

export default connect(mapStateToProps, mapDispatchToProps)(PortefoljeVisning);
