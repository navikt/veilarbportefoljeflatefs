/* eslint-disable jsx-a11y/onclick-has-focus*/
/* eslint-disable jsx-a11y/no-static-element-interactions*/
import React, { Component, PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { veilederShape, brukerShape, portefoljeShape } from '../proptype-shapes';
import { markerAlleBrukere } from './../ducks/portefolje';
import TomPortefoljeModal from '../modal/tom-portefolje-modal';
import { visModal, skjulModal } from '../ducks/modal';
import { initialState } from '../ducks/filtrering';

const settSammenNavn = ( bruker ) => {
    if(bruker.etternavn === '' && bruker.fornavn === ''){
        return '';
    }
    return `${bruker.etternavn}, ${bruker.fornavn}`
};

class PortefoljeTabell extends Component {

    componentWillMount() {
        this.settSorteringOgHentPortefolje = this.settSorteringOgHentPortefolje.bind(this);
        this.visModalDersomPortefoljeErTom();
    }

    settSorteringOgHentPortefolje() {
        this.props.settSorteringForPortefolje();
    }

    visModalDersomPortefoljeErTom() {
        const { toggleVisModal, antallTotalt, filtervalg } = this.props;
        console.log('filtervalg', filtervalg);
        console.log('initialState', initialState);
        if (antallTotalt === 0 && JSON.stringify(filtervalg) === JSON.stringify(initialState.filtervalg)) {
            toggleVisModal();
        }
    }

    render() {
        const { brukere, veiledere, settSomMarkertAlle,
            settSomMarkert, portefolje, modalSkalVises, toggleSkjulModal } = this.props;

        const alleMarkert = brukere.length > 0 && brukere.every(bruker => bruker.markert);
        return (
            <div>
                <TomPortefoljeModal skjulModal={toggleSkjulModal} visModal={modalSkalVises} />
                <table className="tabell portefolje-tabell typo-undertekst" tabIndex="0">
                    <thead className="extra-head">
                        <tr>
                            <th />
                            <th>Bruker</th>
                            <th />
                            <th>Veileder</th>
                            <th />
                            <th />
                        </tr>
                    </thead>
                    <thead>
                        <tr>
                            <th>
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
                                {portefolje.sorteringsrekkefolge !== 'ikke_satt' ?
                                    <a
                                        onClick={this.settSorteringOgHentPortefolje}
                                        role="button"
                                        className="sortering-link valgt"
                                    >
                                        <FormattedMessage id="enhet.veiledere.tabell.etternavn" />
                                    </a> :
                                    <a
                                        onClick={this.settSorteringOgHentPortefolje}
                                        role="button"
                                        className="sortering-link"
                                    >
                                        <FormattedMessage id="enhet.veiledere.tabell.etternavn" />
                                    </a>
                        }
                                <FormattedMessage id="enhet.veiledere.tabell.fornavn" />
                            </th>
                            <th>
                                <a
                                    onClick={this.settSorteringOgHentPortefolje}
                                    role="button"
                                    className="sortering-link"
                                >
                                    <FormattedMessage id="portefolje.tabell.fodselsnummer" />
                                </a>
                            </th>
                            <th>
                                <a
                                    onClick={this.settSorteringOgHentPortefolje}
                                    role="button"
                                    className="sortering-link"
                                >
                                    <FormattedMessage id="enhet.veiledere.tabell.etternavn" />
                                </a>
                                <FormattedMessage id="enhet.veiledere.tabell.fornavn" />
                            </th>
                            <th>
                                <FormattedMessage id="portefolje.tabell.navident" />
                            </th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {brukere.map(bruker => <tr key={bruker.fnr}>
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
                                <a
                                    href={`https://${window.location.hostname}/veilarbpersonflatefs/${bruker.fnr}`}
                                    className="til-bruker-link"
                                >
                                    {settSammenNavn(bruker)}
                                </a>
                            </th>
                            <td>{bruker.fnr}</td>
                            {
                        bruker.veilederId ? <td className="veileder-td">{veiledere
                            .filter(veileder => veileder.ident === bruker.veilederId)
                            .map(veileder => (veileder.navn || veileder.ident))}</td>
                            :
                        <td className="ny-bruker-td"><span className="ny-bruker">Ny bruker</span></td>
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
                            </td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        );
    }
}

PortefoljeTabell.propTypes = {
    antallTotalt: PT.number.isRequired,
    veiledere: PT.arrayOf(veilederShape).isRequired,
    brukere: PT.arrayOf(brukerShape).isRequired,
    portefolje: PT.shape({
        data: portefoljeShape.isRequired,
        sorteringsrekkefolge: PT.string.isRequired
    }).isRequired,
    settSorteringForPortefolje: PT.func.isRequired,
    settSomMarkert: PT.func.isRequired,
    settSomMarkertAlle: PT.func.isRequired,
    modalSkalVises: PT.bool.isRequired,
    toggleSkjulModal: PT.func.isRequired,
    toggleVisModal: PT.func.isRequired,
    filtervalg: PT.object
};

const mapStateToProps = state => ({
    antallTotalt: state.portefolje.data.antallTotalt,
    modalSkalVises: state.modal.visModal,
    filtervalg: state.filtrering.filtervalg
});

const mapDispatchToProps = dispatch => ({
    settSomMarkertAlle: markert => dispatch(markerAlleBrukere(markert)),
    toggleVisModal: () => dispatch(visModal()),
    toggleSkjulModal: () => dispatch(skjulModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(PortefoljeTabell);
