/* eslint-disable jsx-a11y/onclick-has-focus*/
/* eslint-disable jsx-a11y/onclick-has-role*/
/* eslint-disable jsx-a11y/no-static-element-interactions*/
import React, { Component, PropTypes as PT } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Innholdslaster from '../innholdslaster/innholdslaster';
import { hentPortefoljeForEnhet, settSorterRekkefolge } from '../ducks/portefolje';
import { hentVeiledereForEnhet } from '../ducks/veiledere';
import Paginering from '../paginering/paginering';
import { enhetShape, veilederShape } from '../proptype-shapes'

class PortefoljeVisning extends Component {
    componentWillMount() {
        const { valgtEnhet, hentPortefolje, hentVeiledere } = this.props;
        if (valgtEnhet) {
            hentPortefolje(valgtEnhet.enhetId);
            hentVeiledere(valgtEnhet.enhetId);
        }
        this.settSorteringOgHentPortefolje = this.settSorteringOgHentPortefolje.bind(this);
    }

    settVeilederesNavn() {
        const {veiledere, portefolje} = this.props;
        const {brukere} = portefolje.data;

        if (brukere != undefined && veiledere.data.veilederListe != undefined && brukere.length > 1 && veiledere.data.veilederListe.length > 1) {
            for (let i = 0; i < brukere.length; i++) {
                for (let j = 0; j < veiledere.data.veilederListe.length; j++) {
                    if (brukere[i].veilederId == veiledere.data.veilederListe[j].ident) {
                        brukere[i].veilederNavn = veiledere.data.veilederListe[j].navn;
                    }
                }
            }
        }
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
        const { portefolje, valgtEnhet, veiledere, hentPortefolje, sorteringsrekkefolge } = this.props;
        const { antallTotalt, antallReturnert, fraIndex, brukere } = portefolje.data;

        this.settVeilederesNavn();

        const pagineringTekst = (
            <FormattedMessage
                id="enhet.portefolje.paginering.tekst"
                values={{ fraIndex: `${fraIndex}`, tilIndex: fraIndex + antallReturnert, antallTotalt }}
            />
        );

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
                <table className="tabell tabell-skillestrek" tabIndex="0">
                    <thead>
                        <tr>
                            <th>
                                <a onClick={this.settSorteringOgHentPortefolje} role="button">
                                    <FormattedMessage id="portefolje.tabell.navn" />
                                </a>
                            </th>
                            <th>
                                <FormattedMessage id="portefolje.tabell.fodselsnummer" />
                            </th>
                            <th>
                                <FormattedMessage id="portefolje.tabell.veileder" />
                            </th>
                            <th />
                            <th>
                                <div className="nav-input">
                                    <input className="nav-checkbox" id="checkbox-alle-brukere" type="checkbox" />
                                    <label htmlFor="checkbox-alle-brukere" />
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {brukere.map(bruker => <tr key={bruker.fnr}>
                            <td>
                                <a
                                    href={`https://${window.location.hostname}/veilarbpersonflatefs/${bruker.fnr}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {`${bruker.etternavn}, ${bruker.fornavn}`}
                                </a>
                            </td>
                            <td>{bruker.fnr}</td>
                            <td>{bruker.veilederNavn}</td>
                            <td>
                                {bruker.sikkerhetstiltak.length > 0 ? <span>Sikkerhetstiltak</span> : null}
                                {bruker.diskresjonskode != null ?
                                    <span>{`Kode ${bruker.diskresjonskode}`}</span> : null}
                                {bruker.egenAnsatt === true ? <span>Egen ansatt</span> : null}
                            </td>
                            <td>
                                <div className="nav-input">
                                    <input className="nav-checkbox" id={`checkbox-${bruker.fnr}`} type="checkbox" />
                                    <label htmlFor={`checkbox-${bruker.fnr}`} />
                                </div>
                            </td>
                        </tr>)}
                    </tbody>
                </table>
            </Innholdslaster>
        );
    }
}

PortefoljeVisning.propTypes = {
    valgtEnhet: PT.object.isRequired,
    portefolje: PT.shape({
        data: PT.shape({
            brukere: PT.arrayOf(PT.object).isRequired,
            antallTotalt: PT.number.isRequired,
            antallReturnert: PT.number.isRequired,
            fraIndex: PT.number.isRequired
        }).isRequired,
        sorteringsrekkefolge: PT.string.isRequired
    }).isRequired,
    hentPortefolje: PT.func.isRequired,
    hentVeileder: PT.func.isRequired,
    veiledere: PT.shape({
        data: PT.shape({
            enhet: enhetShape.isRequired,
            veilederListe: PT.arrayOf(veilederShape).isRequired
        }).isRequired
    }).isRequired,
    settSortering: PT.func.isRequired,
    sorteringsrekkefolge: PT.string.isRequired,
    fraIndex: PT.number
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
    hentVeiledere: enhetId => dispatch(hentVeiledereForEnhet(enhetId)),
    settSortering: rekkefolge => dispatch(settSorterRekkefolge(rekkefolge))
});

export default connect(mapStateToProps, mapDispatchToProps)(PortefoljeVisning);
