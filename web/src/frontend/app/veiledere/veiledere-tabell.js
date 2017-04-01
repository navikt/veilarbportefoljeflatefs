import React, { Component, PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import { veilederShape } from './../proptype-shapes';
import { settValgtVeileder } from '../ducks/portefolje';
import TomPortefoljeModal from '../modal/tom-portefolje-modal';
import { visModal, skjulModal } from '../ducks/modal';


class VeilederTabell extends Component {
    componentDidMount() {
        this.visModalDersomIngenVeiledere();
    }

    settValgtVeileder(veileder) {
        return () => {
            this.props.settVeileder(veileder);
        };
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
            const currentStorrelse = storrelser.find((storrelse) => storrelse.value === veilederId);
            return currentStorrelse ? currentStorrelse.count : 0;
        };

        const veilederElementer = veiledere.map((veileder) => (
            <tr key={veileder.ident}>
                <th>
                    <Link
                        to={`/portefolje/${veileder.ident}`} onClick={this.settValgtVeileder(veileder)}
                        className="til-veileder-link"
                    >
                        {`${veileder.navn}`}
                    </Link>
                </th>
                <td>{`${veileder.ident}`}</td>
                <td>{portefoljestorrelse(portefoljestorrelser, veileder.ident)}</td>
            </tr>
        ));

        return (
            <div>
                <TomPortefoljeModal skjulModal={toggleSkjulModal} visModal={modalSkalVises} />
                <table className="tabell portefolje-tabell typo-avsnitt">
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
                                <button onClick={this.props.sorterPaaEtternavn} className="sortering-link">
                                    <FormattedMessage id="enhet.veiledere.tabell.etternavn" />
                                </button>
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
                        {veilederElementer}
                    </tbody>
                </table>
            </div>
        );
    }
}

VeilederTabell.propTypes = {
    veiledere: PT.arrayOf(veilederShape).isRequired,
    settVeileder: PT.func.isRequired,
    portefoljestorrelser: PT.arrayOf(PT.object).isRequired,
    sorterPaaEtternavn: PT.func.isRequired,
    modalSkalVises: PT.bool.isRequired,
    toggleSkjulModal: PT.func.isRequired,
    toggleVisModal: PT.func.isRequired,
    veilederListe: PT.arrayOf(veilederShape).isRequired
};

const mapStateToProps = (state) => ({
    modalSkalVises: state.modal.visModal,
    veilederListe: state.veiledere.data.veilederListe

});

const mapDispatchToProps = (dispatch) => ({
    settVeileder: (veileder) => dispatch(settValgtVeileder(veileder)),
    toggleVisModal: () => dispatch(visModal()),
    toggleSkjulModal: () => dispatch(skjulModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(VeilederTabell);
