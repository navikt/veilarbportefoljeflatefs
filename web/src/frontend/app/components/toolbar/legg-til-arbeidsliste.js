import React, { PropTypes as PT, Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import LeggTilArbeidslisteModal from '../../modal/legg-til-arbeidsliste-modal';
import { skjulModal, visModal} from '../../ducks/modal';

class LeggTilArbeidsliste extends Component {
    constructor(props) {
        super(props);

        this.onClickHandler = this.onClickHandler.bind(this);
    }

    onClickHandler() {
       this.props.visArbeidslisteModal();
    }

    render() {
        const { visModal, skalSkjules } = this.props;
        if (skalSkjules) {
            return null;
        }
        return (
            <div className="toolbar_btnwrapper">
                <button type="button" className="toolbar_btn" onClick={this.onClickHandler}>
                    <FormattedMessage id="portefolje.legg.til.arbeidsliste.button"/>
                </button>
                <LeggTilArbeidslisteModal isOpen={visModal} />
            </div>
        );
    }
}

LeggTilArbeidsliste.propTypes = {
    skalSkjules: PT.bool.isRequired,
    visModal: PT.bool.isRequired,
    visArbeidslisteModal: PT.func.isRequired,
    skjulArbeidslisteModal: PT.func.isRequired
};

const mapStateToProps = (state) => ({
    skalSkjules: (state.ui.side.side || '') !== 'veilederoversikt',
    visModal: state.modal.visModal,
    ui: state.ui
});

const mapDispatchToProps = (dispatch) => ({
    visArbeidslisteModal: () => dispatch(visModal()),
    skjulArbeidslisteModal: () => dispatch(skjulModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(LeggTilArbeidsliste);
