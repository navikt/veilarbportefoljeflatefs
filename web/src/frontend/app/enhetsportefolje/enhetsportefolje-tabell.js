import React, { Component, PropTypes as PT } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Tabelletiketter from './../components/tabelletiketter/tabelletiketter';
import { veilederShape, brukerShape, portefoljeShape } from '../proptype-shapes';
import { markerAlleBrukere } from './../ducks/portefolje';
import TomPortefoljeModal from '../modal/tom-portefolje-modal';
import { visModal, skjulModal } from '../ducks/modal';
import { initialState } from '../ducks/filtrering';
import { ytelseFilterErAktiv } from '../utils/utils';
import Utlopsdatokolonne from '../tabell/kolonne_utlopsdato';

const settSammenNavn = (bruker) => {
    if (bruker.etternavn === '' && bruker.fornavn === '') {
        return '';
    }
    return `${bruker.etternavn}, ${bruker.fornavn}`;
};

class EnhetsportefoljeTabell extends Component {

    componentWillMount() {
        this.settSorteringOgHentPortefolje = this.settSorteringOgHentPortefolje.bind(this);
        this.visModalDersomPortefoljeErTom();
    }

    settSorteringOgHentPortefolje(felt) {
        this.props.settSorteringForPortefolje(felt);
    }

    visModalDersomPortefoljeErTom() {
        const { toggleVisModal, antallTotalt, filtervalg } = this.props;
        if (antallTotalt === 0 && JSON.stringify(filtervalg) === JSON.stringify(initialState)) {
            toggleVisModal();
        }
    }

    render() {
        const {
            brukere,
            veiledere,
            settSomMarkertAlle,
            settSomMarkert,
            portefolje,
            modalSkalVises,
            toggleSkjulModal,
            valgtEnhet,
            filtervalg
        } = this.props;
        const sorterEtternavn = portefolje.sorteringsfelt === 'etternavn';
        const sorterFodelsnummer = portefolje.sorteringsfelt === 'fodselsdato';

        const utlopsdatoHeader = !!filtervalg && ytelseFilterErAktiv(filtervalg.ytelse) ?
            (<th>
                <FormattedMessage id="portefolje.tabell.utlopsdato" />
            </th>)
            :
            null;

        const alleMarkert = brukere.length > 0 && brukere.every((bruker) => bruker.markert);
        return (
            <div>
                <TomPortefoljeModal skjulModal={toggleSkjulModal} visModal={modalSkalVises} />
                <table className="tabell portefolje-tabell typo-avsnitt">
                    <thead className="extra-head">
                        <tr>
                            <th />
                            <th colSpan="2">Bruker</th>
                            <th colSpan="3">Veileder</th>
                        </tr>
                    </thead>
                    <thead>
                        <tr>
                            <th>
                                { /* TODO hent checkbokser fra nav-frontend-skjema */}
                                <div className="skjema__input">
                                    <input
                                        className="checkboks"
                                        id="checkbox-alle-brukere"
                                        type="checkbox"
                                        checked={alleMarkert}
                                        onClick={() => settSomMarkertAlle(!alleMarkert)}
                                    />
                                    <label className="skjema__label" htmlFor="checkbox-alle-brukere" />
                                </div>
                            </th>
                            <th>
                                <button
                                    onClick={() => this.settSorteringOgHentPortefolje('etternavn')}
                                    className={classNames({ 'sortering-link': true, valgt: sorterEtternavn })}
                                >
                                    <FormattedMessage id="enhet.veiledere.tabell.etternavn" />
                                </button>
                                <FormattedMessage id="enhet.veiledere.tabell.fornavn" />
                            </th>
                            <th>
                                <button
                                    onClick={() => this.settSorteringOgHentPortefolje('fodselsdato')}
                                    className={classNames({ 'sortering-link': true, valgt: sorterFodelsnummer })}
                                >
                                    <FormattedMessage id="portefolje.tabell.fodselsnummer" />
                                </button>
                            </th>
                            {utlopsdatoHeader}
                            <th>
                                <button
                                    onClick={() => this.settSorteringOgHentPortefolje('etternavn')}
                                    className="sortering-link"
                                >
                                    <FormattedMessage id="enhet.veiledere.tabell.etternavn" />
                                </button>
                                <FormattedMessage id="enhet.veiledere.tabell.fornavn" />
                            </th>
                            <th>
                                <FormattedMessage id="portefolje.tabell.navident" />
                            </th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {brukere.map((bruker) => <tr key={bruker.fnr}>
                            <td>
                                <div className="skjema__input">
                                    <input
                                        className="checkboks"
                                        id={`checkbox-${bruker.fnr}`}
                                        type="checkbox"
                                        checked={!!bruker.markert}
                                        onClick={() => settSomMarkert(bruker.fnr, !bruker.markert)}
                                    />
                                    <label className="skjema__label" htmlFor={`checkbox-${bruker.fnr}`} />
                                </div>
                            </td>
                            <th>
                                <a// eslint-disable-next-line no-undef
                                    href={`https://${window.location.hostname}/veilarbpersonflatefs/` +
                                `${bruker.fnr}?enhet=${valgtEnhet}`}
                                    className="til-bruker-link"
                                >
                                    {settSammenNavn(bruker)}
                                </a>
                            </th>
                            <td>{bruker.fnr}</td>
                            {
                                ytelseFilterErAktiv(filtervalg.ytelse) && bruker.utlopsdato !== null ?
                                    <Utlopsdatokolonne utlopsdato={bruker.utlopsdato} />
                                    : null
                            }
                            {
                            bruker.veilederId ? <td className="veileder-td">{veiledere
                                    .filter((veileder) => veileder.ident === bruker.veilederId)
                                    .map((veileder) => (veileder.navn || veileder.ident))}</td>
                                :
                            <td>
                                <Tabelletiketter type="nybruker">Ny bruker</Tabelletiketter>
                            </td>
                        }
                            <td />
                            <td>
                                {bruker.sikkerhetstiltak.length > 0 ?
                                    <span className="etikett etikett--fokus">Sikkerhetstiltak</span> : null}
                                {bruker.diskresjonskode != null ?
                                    <span className="etikett etikett--fokus">{`Kode ${bruker.diskresjonskode}`}</span>
                                : null}
                                {bruker.egenAnsatt === true ?
                                    <span className="etikett etikett--fokus">Egen ansatt</span> : null}
                                {bruker.erDoed === true ?
                                    <span className="etikett etikett--fokus">Død</span> : null}
                            </td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        );
    }
}

EnhetsportefoljeTabell.propTypes = {
    antallTotalt: PT.number.isRequired,
    veiledere: PT.arrayOf(veilederShape).isRequired,
    brukere: PT.arrayOf(brukerShape).isRequired,
    portefolje: PT.shape({
        data: portefoljeShape.isRequired,
        sorteringsfelt: PT.string.isRequired,
        sorteringsrekkefolge: PT.string.isRequired
    }).isRequired,
    settSorteringForPortefolje: PT.func.isRequired,
    settSomMarkert: PT.func.isRequired,
    settSomMarkertAlle: PT.func.isRequired,
    modalSkalVises: PT.bool.isRequired,
    toggleSkjulModal: PT.func.isRequired,
    toggleVisModal: PT.func.isRequired,
    filtervalg: PT.object,
    valgtEnhet: PT.string.isRequired
};

const mapStateToProps = (state) => ({
    antallTotalt: state.portefolje.data.antallTotalt,
    modalSkalVises: state.modal.visModal,
    filtervalg: state.filtrering,
    valgtEnhet: state.enheter.valgtEnhet.enhet.enhetId
});

const mapDispatchToProps = (dispatch) => ({
    settSomMarkertAlle: (markert) => dispatch(markerAlleBrukere(markert)),
    toggleVisModal: () => dispatch(visModal()),
    toggleSkjulModal: () => dispatch(skjulModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(EnhetsportefoljeTabell);
