/* eslint-disable jsx-a11y/onclick-has-focus*/
/* eslint-disable jsx-a11y/onclick-has-role*/
/* eslint-disable jsx-a11y/no-static-element-interactions*/
import React, { Component, PropTypes as PT } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Innholdslaster from '../innholdslaster/innholdslaster';
import { hentPortefoljeForVeileder, settSorterRekkefolge, settBrukerSomMarkert } from '../ducks/portefolje';
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
        const { portefolje, hentPortefolje, veileder, sorteringsrekkefolge, valgtEnhet, settMarkert } = this.props;
        const { antallTotalt, antallReturnert, fraIndex, brukere } = portefolje.data;

        const pagineringTekst = (
            <FormattedMessage
                id="enhet.portefolje.paginering.tekst"
                values={{ fraIndex: `${fraIndex}`, tilIndex: fraIndex + antallReturnert, antallTotalt }}
            />
        );


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
                <table className="tabell tabell-skillestrek" tabIndex="0">
                    <thead>
                        <tr>
                            <th>
                                <div className="nav-input">
                                    <input className="nav-checkbox" id="checkbox-alle-brukere" type="checkbox" />
                                    <label htmlFor="checkbox-alle-brukere" />
                                </div>
                            </th>
                            <th>
                                <a onClick={this.settSorteringOgHentPortefolje} role="button">
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
                                        >
                                            {`${bruker.etternavn}, ${bruker.fornavn}`}
                                        </a>
                                    </td>
                                    <td>{bruker.fnr}</td>
                                    <td>
                                        {bruker.sikkerhetstiltak.length > 0 ?
                                            <span>
                                                <FormattedMessage id="veileder.portefolje.sikkerhetstiltak" />
                                            </span> : null}
                                        {bruker.diskresjonskode != null ?
                                            <span>{`Kode ${bruker.diskresjonskode}`}</span> : null}
                                        {bruker.egenAnsatt === true ?
                                            <span>
                                                <FormattedMessage id="veileder.portefolje.egen.ansatt" />
                                            </span> : null}
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
    settMarkert: PT.func.isRequired
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
    settMarkert: (fnr, markert) => dispatch(settBrukerSomMarkert(fnr, markert))
});

export default connect(mapStateToProps, mapDispatchToProps)(VeilederPortefoljeVisning);
