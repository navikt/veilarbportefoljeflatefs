/* eslint-disable jsx-a11y/onclick-has-focus*/
/* eslint-disable jsx-a11y/onclick-has-role*/
/* eslint-disable jsx-a11y/no-static-element-interactions*/
import React, { Component, PropTypes as PT } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Innholdslaster from '../innholdslaster/innholdslaster';
import { hentPortefoljeForVeileder, settSorterRekkefolge } from '../ducks/portefolje';
import Pagination from '../utils/pagination';

class VeilederPortefoljeVisning extends Component {
    componentWillMount() {
        const { hentPortefolje } = this.props;
        hentPortefolje(this.props.ident, this.props.veilederident);
        this.settSorteringOgHentPortefolje = this.settSorteringOgHentPortefolje.bind(this);
    }

    settSorteringOgHentPortefolje() {
        const { sorteringsrekkefolge, settSortering, fraIndex, ident, hentPortefolje, veilederident } = this.props;
        let valgtRekkefolge = '';
        if (sorteringsrekkefolge === 'ascending') {
            valgtRekkefolge = 'descending';
            settSortering('descending');
        } else {
            valgtRekkefolge = 'ascending';
            settSortering('ascending');
        }
        hentPortefolje(ident, veilederident, valgtRekkefolge, fraIndex);
    }


    render() {
        const { portefolje, ident, veilederident, hentPortefolje, sorteringsrekkefolge } = this.props;
        const { antallTotalt, antallReturnert, fraIndex } = portefolje.data;

        return (
            <Innholdslaster avhengigheter={[portefolje]}>
                <Pagination
                    antallTotalt={antallTotalt}
                    fraIndex={fraIndex}
                    antallReturnert={antallReturnert}
                    hentEnhetsPortefolje={(fra, totalt) =>
                        hentPortefolje(ident, veilederident, sorteringsrekkefolge, fra, totalt)}
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
                            <th />
                            <th>
                                flagg
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {portefolje.data.portefolje.brukere.map(bruker => <tr key={bruker.fnr}>
                            <td>{`${bruker.etternavn}, ${bruker.fornavn}`} </td>
                            <td>{bruker.fnr}</td>
                            <td>
                                {bruker.sikkerhetstiltak.length > 0 ? <span>Sikkerhetstiltak</span> : null}
                                {bruker.diskresjonskode != null ?
                                    <span>{`Kode ${bruker.diskresjonskode}`}</span> : null}
                                {bruker.egenAnsatt === true ? <span>Egen ansatt</span> : null}
                            </td>
                            <td>
                                flagg
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
            portefolje: PT.shape({
                brukere: PT.arrayOf(PT.object)
            }).isRequired,
            antallTotalt: PT.number.isRequired,
            antallReturnert: PT.number.isRequired,
            fraIndex: PT.number.isRequired
        }).isRequired,
        sorteringsrekkefolge: PT.string.isRequired
    }).isRequired,
    ident: PT.string.isRequired,
    veilederident: PT.string.isRequired,
    hentPortefolje: PT.func.isRequired,
    settSortering: PT.func.isRequired,
    sorteringsrekkefolge: PT.string.isRequired,
    fraIndex: PT.number
};

const mapStateToProps = state => ({
    portefolje: state.portefolje,
    ident: state.enheter.ident,
    sorteringsrekkefolge: state.portefolje.sorteringsrekkefolge,
    veilederident: state.portefolje.veilederident
});

const mapDispatchToProps = dispatch => ({
    hentPortefolje: (ident, veilederident, rekkefolge, fra = 0, antall = 20) =>
        dispatch(hentPortefoljeForVeileder(ident, veilederident, rekkefolge, fra, antall)),
    settSortering: rekkefolge => dispatch(settSorterRekkefolge(rekkefolge))
});

export default connect(mapStateToProps, mapDispatchToProps)(VeilederPortefoljeVisning);
