import React, { Component, PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import Modal from 'nav-frontend-modal';
import { Normaltekst, Innholdstittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import { skjulModal } from '../ducks/modal';
import { markerAlleBrukere } from '../ducks/portefolje';
import LeggTilArbeidslisteForm from './legg-til-arbeidsliste-form';

Modal.setAppElement('#applikasjon');

class LeggTilArbeidslisteModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: this.props.isOpen
        };
        this.lukkModal = this.lukkModal.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isOpen !== this.state.isOpen) {
            this.setState({ isOpen: nextProps.isOpen });
        }
    }

    lukkModal() {
        this.setState({ isOpen: false });
        this.props.skjulArbeidslisteModal();
        this.props.fjernMarkerteBrukere();
    }

    render() {
        const { valgteBrukere } = this.props;

        return (
            <Modal
                className={valgteBrukere.length < 3 ? "modal_overflow" : null} //
                contentLabel="Legg i arbeidsliste"
                isOpen={this.state.isOpen || false}
                onRequestClose={this.lukkModal}
                closeButton
            >
                <div className="leggiarbeidsliste__modal">
                    <Innholdstittel tag="h1" className="blokk-xs">
                        <FormattedMessage id="modal.legg.til.arbeidsliste.tittel" />
                    </Innholdstittel>
                    <Normaltekst className="blokk-s">
                        <FormattedMessage
                            id="modal.legg.til.arbeidsliste.infotekst"
                            values={{ antall: valgteBrukere.length }}
                        />
                    </Normaltekst>
                    <LeggTilArbeidslisteForm valgteBrukere={valgteBrukere} lukkModal={this.lukkModal} />
                </div>
            </Modal>
        );
    }
}

LeggTilArbeidslisteModal.propTypes = {
    isOpen: PT.bool.isRequired,
    valgteBrukere: PT.arrayOf(PT.object).isRequired
};

const mapStateToProps = (state) => ({
    visModal: state.modal.visModal
});

const mapDispatchToProps = (dispatch) => ({
    skjulArbeidslisteModal: () => dispatch(skjulModal()),
    fjernMarkerteBrukere: () => dispatch(markerAlleBrukere(false))
});

export default connect(mapStateToProps, mapDispatchToProps)(LeggTilArbeidslisteModal);
