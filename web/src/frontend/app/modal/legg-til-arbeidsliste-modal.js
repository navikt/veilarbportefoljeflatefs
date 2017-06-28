import React, { Component, PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Modal from 'nav-frontend-modal';
import { Normaltekst, Undertittel, Innholdstittel } from 'nav-frontend-typografi';
import { IntlMessage } from '../utils/intl-utils';
import Datovelger from '../components/datovelger/datovelger';
import { skjulModal } from '../ducks/modal';

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
        this.setState({ isOpen: false});
        this.props.skjulArbeidslisteModal();
    }

    render() {
        return (
            <Modal
                contentLabel="Legg i arbeidsliste"
                isOpen={this.state.isOpen || false}
                onRequestClose={this.lukkModal}
                closeButton
            >
                <div className="leggiarbeidsliste__modal">
                    <Innholdstittel tag="h1" className="blokk-xs">
                        <IntlMessage id="modal.legg.til.arbeidsliste.tittel" />
                    </Innholdstittel>
                    <Normaltekst className="blokk-s">
                        <IntlMessage
                            id="modal.legg.til.arbeidsliste.infotekst"
                            values={{ antall: 1 }}
                        />
                    </Normaltekst>
                    <Undertittel className="blokk-s">
                        <IntlMessage
                            id="modal.legg.til.arbeidsliste.brukerinfo"
                            values={{ etternavn: 'Kirkhus', fornavn: 'Mathilde', fnr: '123456789' }}
                        />
                    </Undertittel>
                    <form>
                        <div className="nav-input blokk-s">
                            <textarea
                                rows="5"
                                id="arbeidslistekommentar"
                                name="arbeidslistekommentar"
                                className="input-fullbredde"
                            />
                        </div>
                        <Datovelger feltNavn="datoFelt" />
                    </form>
                    <div>
                        <button className="knapp knapp--hoved" onClick={this.lukkModal}>
                            <IntlMessage id="modal.legg.til.arbeidsliste.knapp.lagre" />
                        </button>
                        <button className="knapp" onClick={this.lukkModal}>
                            <IntlMessage id="modal.legg.til.arbeidsliste.knapp.avbryt" />
                        </button>
                    </div>
                </div>
            </Modal>
        );
    }
}

LeggTilArbeidslisteModal.propTypes = {
    isOpen: PT.bool.isRequired
};

const mapStateToProps = (state) => ({
    visModal: state.modal.visModal
});

const mapDispatchToProps = (dispatch) => ({
    skjulArbeidslisteModal: () => dispatch(skjulModal())
});


LeggTilArbeidslisteModal = reduxForm({
    form: 'arbeidsliste_kommentar_skjema'
})(LeggTilArbeidslisteModal);

export default connect(mapStateToProps, mapDispatchToProps)(LeggTilArbeidslisteModal);
