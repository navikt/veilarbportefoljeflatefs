/* eslint-disable jsx-a11y/onclick-has-focus*/
/* eslint-disable jsx-a11y/onclick-has-role*/
/* eslint-disable jsx-a11y/no-static-element-interactions*/
import React, { Component, PropTypes as PT } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Innholdslaster from '../innholdslaster/innholdslaster';
import {
    hentPortefoljeForVeileder,
    settSorterRekkefolge,
    settBrukerSomMarkert,
    nullstillFeilendeTilordninger,
    markerAlleBrukere
} from '../ducks/portefolje';
import Paginering from '../paginering/paginering';
import { enhetShape, veilederShape } from './../proptype-shapes';


class VeilederPortefoljeVisning extends Component {
    componentWillMount() {
        const { hentPortefolje, valgtEnhet, veileder } = this.props;
        hentPortefolje(valgtEnhet.enhetId, veileder);
        this.settSorteringOgHentPortefolje = this.settSorteringOgHentPortefolje.bind(this);
    }

    settSorteringOgHentPortefolje() {
        const { sorteringsrekkefolge, settSortering, fraIndex,
                hentPortefolje, veileder, valgtEnhet } = this.props;
        let valgtRekkefolge = '';
        if (sorteringsrekkefolge === 'ascending') {
            valgtRekkefolge = 'descending';
            settSortering('descending');
        } else {
            valgtRekkefolge = 'ascending';
            settSortering('ascending');
        }
        hentPortefolje(valgtEnhet.enhetId, veileder, valgtRekkefolge, fraIndex);
    }


    render() {
        const {
            portefolje,
            hentPortefolje,
            veileder,
            sorteringsrekkefolge,
            valgtEnhet,
            settMarkert,
            clearFeilendeTilordninger,
            settSomMarkertAlle
        } = this.props;

        const { antallTotalt, antallReturnert, fraIndex, brukere } = portefolje.data;

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

        const alleMarkert = brukere.every(bruker => bruker.markert);

        return (
            <Innholdslaster avhengigheter={[portefolje]}>
                <Paginering
                    antallTotalt={antallTotalt}
                    fraIndex={fraIndex}
                    hentListe={(fra, antall) =>
                        hentPortefolje(valgtEnhet.enhetId, veileder, sorteringsrekkefolge, fra, antall)}
                    tekst={pagineringTekst}
                    sideStorrelse={20}
                />
                <table className="tabell portefolje-tabell" tabIndex="0">
                    <thead>
                        <tr>
                            <th>
                                <div className="nav-input">
                                    <input
                                        className="nav-checkbox"
                                        id="checkbox-alle-brukere"
                                        type="checkbox"
                                        checked={alleMarkert}
                                        onClick={() => settSomMarkertAlle(!alleMarkert)}
                                    />
                                    <label htmlFor="checkbox-alle-brukere" />
                                </div>
                            </th>
                            <th>
                                <a
                                    onClick={this.settSorteringOgHentPortefolje}
                                    role="button"
                                    className="sortering-link"
                                >
                                    <FormattedMessage id="portefolje.tabell.navn" />
                                </a>
                            </th>
                            <th>
                                <FormattedMessage id="portefolje.tabell.fodselsnummer" />
                            </th>
                            <th />
                        </tr>
                    </thead>

                    <tbody>
                        {brukere.filter(b => b.veilederId === veileder.ident)
                                .map(bruker => <tr key={bruker.fnr}>
                                    <td>
                                        <div className="nav-input">
                                            <input
                                                className="nav-checkbox"
                                                id={`checkbox-${bruker.fnr}`}
                                                type="checkbox"
                                                checked={bruker.markert}
                                                onClick={() => settMarkert(bruker.fnr, !bruker.markert)}
                                            />
                                            <label htmlFor={`checkbox-${bruker.fnr}`} />
                                        </div>
                                    </td>
                                    <td>
                                        <a
                                            href={`https://${window.location.hostname}` +
                                            `/veilarbpersonflatefs/${bruker.fnr}`}
                                            className="til-bruker-link"
                                        >
                                            {`${bruker.etternavn}, ${bruker.fornavn}`}
                                        </a>
                                    </td>
                                    {bruker.fnr != null ?
                                        <td className="fodselsnummer-td">{bruker.fnr}</td> :
                                        <td className="ny-bruker-td"><span className="ny-bruker">Ny bruker</span></td>
                                    }
                                    <td className="sikkerhetstiltak-td">
                                        {bruker.sikkerhetstiltak.length > 0 ?
                                            <span className="sikkerhetstiltak">Sikkerhetstiltak</span> : null}
                                        {bruker.diskresjonskode != null ?
                                            <span className="diskresjonskode">
                                                {`Kode ${bruker.diskresjonskode}`}
                                            </span> :
                                            null}
                                        {bruker.egenAnsatt === true ?
                                            <span className="egen-ansatt">Egen ansatt</span> : null}
                                    </td>
                                </tr>)}
                    </tbody>
                </table>
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
    fraIndex: PT.number,
    settMarkert: PT.func.isRequired,
    clearFeilendeTilordninger: PT.func.isRequired,
    settSomMarkertAlle: PT.func.isRequired
};

const mapStateToProps = state => ({
    portefolje: state.portefolje,
    valgtEnhet: state.enheter.valgtEnhet,
    sorteringsrekkefolge: state.portefolje.sorteringsrekkefolge,
    veileder: state.portefolje.veileder
});

const mapDispatchToProps = dispatch => ({
    hentPortefolje: (enhet, veileder, rekkefolge, fra = 0, antall = 20) =>
        dispatch(hentPortefoljeForVeileder(enhet, veileder, rekkefolge, fra, antall)),
    settSortering: rekkefolge => dispatch(settSorterRekkefolge(rekkefolge)),
    settMarkert: (fnr, markert) => dispatch(settBrukerSomMarkert(fnr, markert)),
    clearFeilendeTilordninger: () => dispatch(nullstillFeilendeTilordninger()),
    settSomMarkertAlle: markert => dispatch(markerAlleBrukere(markert))
});

export default connect(mapStateToProps, mapDispatchToProps)(VeilederPortefoljeVisning);
