import React, { Component, PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { Link } from 'react-router';
import { veilederShape } from './../proptype-shapes';
import { settValgtVeileder } from '../ducks/portefolje';
import TomPortefoljeModal from '../modal/tom-portefolje-modal';
import { visModal, skjulModal } from '../ducks/modal';


class VeilederTabell extends Component {
    componentDidMount() {
        this.visModalDersomIngenVeiledere();
    }

    settOgNavigerTilValgtVeileder(veileder) {
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
        const { veiledere, modalSkalVises, toggleSkjulModal, currentSortering } = this.props;

        const sorterEtternavn = currentSortering.felt === 'etternavn';
        const sorterPaaPortefoljeStr = currentSortering.felt === 'portefoljestorrelse';

        const veilederElementer = veiledere.map((veileder) => (
            <tr key={veileder.ident}>
                <th>
                    <Link
                        to={`/portefolje/${veileder.ident}?clean`}
                        onClick={this.settOgNavigerTilValgtVeileder(veileder)}
                        className="til-veileder-link"
                    >
                        {`${veileder.navn}`}
                    </Link>
                </th>
                <td>{`${veileder.ident}`}</td>
                <td className="tabell-element-center">{veileder.portefoljestorrelse}</td>
                <td />
            </tr>
        ));

        return (
            <div>
                <TomPortefoljeModal skjulModal={toggleSkjulModal} visModal={modalSkalVises} />
                <table className="tabell veileder-tabell portefolje-tabell typo-avsnitt">
                    <thead className="extra-head">
                        <tr>
                            <th>Veileder</th>
                            <th colSpan="3" />
                        </tr>
                    </thead>
                    <thead>
                        <tr>
                            <th scope="col">
                                <button
                                    onClick={this.props.sorterPaaEtternavn}
                                    className={classNames('sortering-link', { valgt: sorterEtternavn })}
                                    aria-pressed={sorterEtternavn}
                                    aria-label={sorterEtternavn ?
                                        currentSortering.rekkefolge : 'inaktiv'}
                                >
                                    <FormattedMessage id="enhet.veiledere.tabell.etternavn" />
                                </button>
                                <FormattedMessage id="enhet.veiledere.tabell.fornavn" />
                            </th>
                            <th scope="col">
                                <FormattedMessage id="enhet.veiledere.tabell.ident" />
                            </th>
                            <th className="tabell-element-center" scope="col">
                                <button
                                    onClick={this.props.sorterPaaPortefoljestorrelse}
                                    className={classNames('sortering-link', { valgt: sorterPaaPortefoljeStr })}
                                    aria-pressed={sorterPaaPortefoljeStr}
                                    aria-label={sorterPaaPortefoljeStr ?
                                        currentSortering.rekkefolge : 'inaktiv'}
                                >
                                    <FormattedMessage id="enhet.veiledere.tabell.brukere" />
                                </button>
                            </th>
                            <th />
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
    sorterPaaEtternavn: PT.func.isRequired,
    modalSkalVises: PT.bool.isRequired,
    toggleSkjulModal: PT.func.isRequired,
    toggleVisModal: PT.func.isRequired,
    veilederListe: PT.arrayOf(veilederShape).isRequired,
    sorterPaaPortefoljestorrelse: PT.func.isRequired,
    currentSortering: PT.shape({
        felt: PT.string.isRequired,
        rekkefolge: PT.string.isRequired
    }).isRequired
};

const mapStateToProps = (state) => ({
    modalSkalVises: state.modal.visModal,
    veilederListe: state.veiledere.data.veilederListe,
    currentSortering: state.veilederpaginering.currentSortering

});

const mapDispatchToProps = (dispatch) => ({
    settVeileder: (veileder) => dispatch(settValgtVeileder(veileder)),
    toggleVisModal: () => dispatch(visModal()),
    toggleSkjulModal: () => dispatch(skjulModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(VeilederTabell);
