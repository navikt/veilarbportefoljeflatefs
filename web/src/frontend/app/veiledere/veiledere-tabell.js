/* eslint-disable jsx-a11y/onclick-has-focus*/
/* eslint-disable jsx-a11y/onclick-has-role*/
/* eslint-disable jsx-a11y/no-static-element-interactions*/
import React, { Component, PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import history from '../history';
import { veilederShape } from './../proptype-shapes';
import { settValgtVeileder } from '../ducks/portefolje';
import { eksporterEnhetsportefoljeTilLocalStorage } from '../ducks/utils';
import TomPortefoljeModal from '../modal/tom-portefolje-modal';
import { visModal, skjulModal } from '../ducks/modal';


class VeilederTabell extends Component {
    componentDidMount() {
        const { valgtEnhet, filtervalg } = this.props;
        eksporterEnhetsportefoljeTilLocalStorage(filtervalg, valgtEnhet, location.pathname);
        this.visModalDersomIngenVeiledere();
    }

    settValgtVeileder(veileder) {
        const { settVeileder } = this.props;
        settVeileder(veileder);
        history.push('/portefolje');
    }

    visModalDersomIngenVeiledere() {
        const { toggleVisModal, veilederListe } = this.props;
        if (veilederListe.length === 0) {
            toggleVisModal();
        }
    }

    render() {
        const { veiledere, portefoljestorrelser, modalSkalVises, toggleSkjulModal } = this.props;
        const portefoljestorrelse = (storrelser, veilederId) => {
            const currentStorrelse = storrelser.find(storrelse => storrelse.value === veilederId);
            return currentStorrelse ? currentStorrelse.count : 0;
        };

        return (
            <div>
                <TomPortefoljeModal skjulModal={toggleSkjulModal} visModal={modalSkalVises} />
                <table className="tabell portefolje-tabell typo-undertekst" tabIndex="0">
                <thead className="extra-head">
                    <tr>
                        <th>Veileder</th>
                        <th />
                        <th />
                    </tr>
                </thead>
                <thead>
                    <tr>
                        <th scope="col">
                            <a onClick={this.props.sorterPaaEtternavn} role="button" className="sortering-link">
                                <FormattedMessage id="enhet.veiledere.tabell.etternavn" />
                            </a>
                            <FormattedMessage id="enhet.veiledere.tabell.fornavn" />
                        </th>
                        <th scope="col">
                            <FormattedMessage id="enhet.veiledere.tabell.ident" />
                        </th>
                        <th scope="col">
                            <FormattedMessage id="enhet.veiledere.tabell.brukere" />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {veiledere.map(veileder =>
                        <tr key={veileder.ident}>
                            <th>
                                <a onClick={() => this.settValgtVeileder(veileder)} className="til-veileder-link">
                                    {`${veileder.navn}`}
                                </a>
                            </th>
                            <td>{`${veileder.ident}`}</td>
                            <td>{portefoljestorrelse(portefoljestorrelser, veileder.ident)}</td>
                        </tr>
                )}
                    </tbody>
                </table>
            </div>
        );
    }
}

VeilederTabell.propTypes = {
    veiledere: PT.arrayOf(veilederShape),
    settVeileder: PT.func.isRequired,
    portefoljestorrelser: PT.arrayOf(PT.object).isRequired,
    sorterPaaEtternavn: PT.func.isRequired,
    valgtEnhet: PT.object,
    filtervalg: PT.object,
    modalSkalVises: PT.bool.isRequired,
    toggleSkjulModal: PT.func.isRequired,
    toggleVisModal: PT.func.isRequired,
    veilederListe: PT.arrayOf(veilederShape)
};

const mapStateToProps = state => ({
    valgtEnhet: state.enheter.valgtEnhet.enhet,
    filtervalg: state.filtrering.filtervalg,
    modalSkalVises: state.modal.visModal,
    veilederListe: state.veiledere.data.veilederListe

});

const mapDispatchToProps = dispatch => ({
    settVeileder: veileder => dispatch(settValgtVeileder(veileder)),
    toggleVisModal: () => dispatch(visModal()),
    toggleSkjulModal: () => dispatch(skjulModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(VeilederTabell);
