/* eslint-disable jsx-a11y/onclick-has-focus*/
/* eslint-disable jsx-a11y/onclick-has-role*/
/* eslint-disable jsx-a11y/no-static-element-interactions*/
import React, {Component, PropTypes as PT} from "react";
import {FormattedMessage} from "react-intl";
import {connect} from "react-redux";
import Innholdslaster from "../innholdslaster/innholdslaster";
import {hentPortefoljeForEnhet, settSorterRekkefolge} from "../ducks/portefolje";
import Pagination from "../utils/pagination";

class PortefoljeVisning extends Component {
    componentWillMount() {
        const { valgtEnhet, hentPortefolje } = this.props;
        if (valgtEnhet) {
            hentPortefolje(valgtEnhet.enhetId, this.props.ident);
        }
        this.settSorteringOgHentPortefolje = this.settSorteringOgHentPortefolje.bind(this);
    }

    settSorteringOgHentPortefolje() {
        const { sorteringsrekkefolge, settSortering, fraIndex, valgtEnhet, ident, hentPortefolje } = this.props;
        let valgtRekkefolge = '';
        if (sorteringsrekkefolge === 'ascending') {
            valgtRekkefolge = 'descending';
            settSortering('descending');
        } else {
            valgtRekkefolge = 'ascending';
            settSortering('ascending');
        }
        hentPortefolje(valgtEnhet.enhetId, ident, valgtRekkefolge, fraIndex);
    }


    render() {
        const { portefolje, valgtEnhet, ident, hentPortefolje, sorteringsrekkefolge } = this.props;
        const { antallTotalt, antallReturnert, fraIndex } = portefolje.data;

        return (
            <Innholdslaster avhengigheter={[portefolje]}>
                <Pagination
                    antallTotalt={antallTotalt}
                    fraIndex={fraIndex}
                    antallReturnert={antallReturnert}
                    hentPortefolje={(fra, totalt) =>
                        hentPortefolje(valgtEnhet.enhetId, ident, sorteringsrekkefolge, fra, totalt)}
                />
                <table className="tabell tabell-skillestrek" tabIndex="0">
                    <thead>
                        <tr>
                            <th>
                                <a onClick={this.settSorteringOgHentPortefolje}>
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
                        {portefolje.data.brukere.map(bruker => <tr key={bruker.fnr}>
                            <td>{`${bruker.etternavn}, ${bruker.fornavn}`} </td>
                            <td>{bruker.fnr}</td>
                            <td>{ bruker.veileder != null ? `${bruker.veileder.etternavn}, ${bruker.veileder.fornavn}`
                                  : 'Ny bruker'
                                }
                            </td>
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
    portefolje: PT.object.isRequired,
    ident: PT.string.isRequired,
    hentPortefolje: PT.func.isRequired,
    settSortering: PT.func.isRequired,
    sorteringsrekkefolge: PT.string.isRequired,
    fraIndex: PT.number.isRequired
};

const mapStateToProps = state => ({
    portefolje: state.portefolje,
    valgtEnhet: state.enheter.valgtEnhet,
    ident: state.enheter.ident,
    sorteringsrekkefolge: state.portefolje.sorteringsrekkefolge
});

const mapDispatchToProps = dispatch => ({
    hentPortefolje: (enhet, ident, rekkefolge, fra = 0, antall = 20) =>
        dispatch(hentPortefoljeForEnhet(enhet, ident, rekkefolge, fra, antall)),
    settSortering: rekkefolge => dispatch(settSorterRekkefolge(rekkefolge))
});

export default connect(mapStateToProps, mapDispatchToProps)(PortefoljeVisning);
