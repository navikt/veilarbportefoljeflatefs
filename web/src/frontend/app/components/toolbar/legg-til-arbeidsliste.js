import React, { PropTypes as PT, Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import LeggTilArbeidslisteModal from '../../modal/legg-til-arbeidsliste-modal';
import { skjulModal, visModal } from '../../ducks/modal';

class LeggTilArbeidsliste extends Component {
    constructor(props) {
        super(props);

        this.onClickHandler = this.onClickHandler.bind(this);
    }

    onClickHandler() {
        this.props.visArbeidslisteModal();
    }

    render() {
        const { skalSkjules, portefolje } = this.props;
        const valgteBrukere = portefolje.data.brukere.filter((bruker) => bruker.markert === true);
        const aktiv = valgteBrukere.length > 0;
        const modalSkalVises = this.props.visModal;

        if (skalSkjules) {
            return null;
        }
        return (
            <div className="toolbar_btnwrapper">
                <button type="button" className="toolbar_btn" disabled={!aktiv} onClick={this.onClickHandler}>
                    <FormattedMessage id="portefolje.legg.til.arbeidsliste.button" />
                </button>
                <LeggTilArbeidslisteModal isOpen={modalSkalVises} valgteBrukere={valgteBrukere} />
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
    valgteBrukere: []
};

const mapStateToProps = (state) => ({
    skalSkjules: (state.ui.side.side || '') !== 'veilederoversikt',
    visModal: state.modal.modalSkalVises,
    portefolje: state.portefolje
});

const mapDispatchToProps = (dispatch) => ({
    visArbeidslisteModal: () => dispatch(visModal()),
    skjulArbeidslisteModal: () => dispatch(skjulModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(LeggTilArbeidsliste);
