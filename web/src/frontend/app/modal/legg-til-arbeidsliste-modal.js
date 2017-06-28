import React, { Component, PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Modal from 'nav-frontend-modal';
import { Normaltekst, Undertittel, Innholdstittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
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
        const { valgteBrukere } = this.props;

        return (
            <Modal
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
                    {valgteBrukere.map((bruker) =>
                        <div>
                            <Undertittel className="blokk-s">
                                <FormattedMessage
                                    id="modal.legg.til.arbeidsliste.brukerinfo"
                                    values={{
                                        etternavn: bruker.etternavn,
                                        fornavn: bruker.fornavn,
                                        fnr: bruker.fnr
                                    }}
                                />
                            </Undertittel>
                            < form >
                                < div className="nav-input blokk-s">
                                <textarea
                                rows="5"
                                id="arbeidslistekommentar"
                                name="arbeidslistekommentar"
                                className="input-fullbredde"
                                />
                                </div>
                                <Datovelger feltNavn="datoFelt" />
                            </form>
                        </div>
                    )}
                    <div>
                        <button className="knapp knapp--hoved" onClick={this.lukkModal}>
                            <FormattedMessage id="modal.legg.til.arbeidsliste.knapp.lagre" />
                        </button>
                        <button className="knapp" onClick={this.lukkModal}>
                            <FormattedMessage id="modal.legg.til.arbeidsliste.knapp.avbryt" />
                        </button>
                    </div>
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
    skjulArbeidslisteModal: () => dispatch(skjulModal())
});


LeggTilArbeidslisteModal = reduxForm({
    form: 'arbeidsliste_kommentar_skjema'
})(LeggTilArbeidslisteModal);

export default connect(mapStateToProps, mapDispatchToProps)(LeggTilArbeidslisteModal);
