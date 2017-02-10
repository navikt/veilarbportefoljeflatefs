/* eslint-disable jsx-a11y/onclick-has-focus*/
/* eslint-disable jsx-a11y/onclick-has-role*/
/* eslint-disable jsx-a11y/no-static-element-interactions*/
import React, { Component, PropTypes as PT } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Innholdslaster from '../innholdslaster/innholdslaster';
import { hentPortefoljeForEnhet, settSorterRekkefolge } from '../ducks/portefolje';
import Pagination from '../utils/pagination';

class PortefoljeVisning extends Component {
    componentWillMount() {
        const { valgtEnhet, hentPortefolje } = this.props;
        if (valgtEnhet) {
            hentPortefolje(valgtEnhet.enhetId);
        }
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
        const { portefolje, valgtEnhet, hentPortefolje, sorteringsrekkefolge } = this.props;
        const { antallTotalt, antallReturnert, fraIndex, brukere } = portefolje.data;

        return (
            <Innholdslaster avhengigheter={[portefolje]}>
                <Pagination
                    antallTotalt={antallTotalt}
                    fraIndex={fraIndex}
                    antallReturnert={antallReturnert}
                    hentPortefolje={(fra, totalt) =>
                        hentPortefolje(valgtEnhet.enhetId, sorteringsrekkefolge, fra, totalt)}
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
                                    href={`https://${window.location.hostname}/veilarbpersonfs/${bruker.fnr}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {`${bruker.etternavn}, ${bruker.fornavn}`}
                                </a>
                            </td>
                            <td>{bruker.fnr}</td>
                            <td>{'Duck, Donald'} </td>
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
    hentPortefolje: PT.func.isRequired,
    settSortering: PT.func.isRequired,
    sorteringsrekkefolge: PT.string.isRequired,
    fraIndex: PT.number
};

const mapStateToProps = state => ({
    portefolje: state.portefolje,
    valgtEnhet: state.enheter.valgtEnhet,
    sorteringsrekkefolge: state.portefolje.sorteringsrekkefolge
});

const mapDispatchToProps = dispatch => ({
    hentPortefolje: (enhet, rekkefolge, fra = 0, antall = 20) =>
        dispatch(hentPortefoljeForEnhet(enhet, rekkefolge, fra, antall)),
    settSortering: rekkefolge => dispatch(settSorterRekkefolge(rekkefolge))
});

export default connect(mapStateToProps, mapDispatchToProps)(PortefoljeVisning);
