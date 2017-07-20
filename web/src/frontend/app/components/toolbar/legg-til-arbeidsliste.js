import React, { PropTypes as PT, Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import ArbeidslisteModal from '../../modal/arbeidsliste-modal';
import { skjulModal, visModal } from '../../ducks/modal';

class LeggTilArbeidsliste extends Component {
    constructor(props) {
        super(props);

        this.onClickHandler = this.onClickHandler.bind(this);
    }

    onClickHandler() {
        this.props.visArbeidslisteModal();
    }

    arbeidslisteButton(valgteBrukere) {
        const inneholderBrukerMedArbeidsliste = valgteBrukere.some((bruker) => bruker.arbeidsliste.arbeidslisteAktiv);
        if (inneholderBrukerMedArbeidsliste) {
            return (
                <button
                    type="button"
                    className="toolbar_btn"
                    disabled={valgteBrukere.length < 1}
                    onClick={this.onClickHandler}
                >
                    <FormattedMessage id="portefolje.slett.arbeidsliste.button" />
                </button>
            );
        }

        return (
            <button
                type="button"
                className="toolbar_btn"
                disabled={valgteBrukere.length < 1}
                onClick={this.onClickHandler}
            >
                <FormattedMessage id="portefolje.legg.til.arbeidsliste.button" />
            </button>
        );
    }

    render() {
        const { skalSkjules, portefolje } = this.props;
        const valgteBrukere = portefolje.data.brukere.filter((bruker) => bruker.markert === true);
        const modalSkalVises = this.props.visModal;

        if (skalSkjules) {
            return null;
        }
        return (
            <div className="toolbar_btnwrapper">
                { this.arbeidslisteButton(valgteBrukere) }
                <ArbeidslisteModal isOpen={modalSkalVises} valgteBrukere={valgteBrukere} />
            </div>
        );
    }
}

LeggTilArbeidsliste.propTypes = {
    portefolje: PT.object.isRequired,
    skalSkjules: PT.bool.isRequired,
    visModal: PT.bool.isRequired,
    visArbeidslisteModal: PT.func.isRequired
};

LeggTilArbeidsliste.defaultProps = {
    valgteBrukere: [],
    visModal: false
};

const mapStateToProps = (state) => ({
    skalSkjules: (state.ui.side.side || '') !== 'veilederoversikt',
    visModal: state.modal.visModal,
    portefolje: state.portefolje
});

const mapDispatchToProps = (dispatch) => ({
    visArbeidslisteModal: () => dispatch(visModal()),
    skjulArbeidslisteModal: () => dispatch(skjulModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(LeggTilArbeidsliste);
