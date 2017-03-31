import React, { PropTypes as PT } from 'react';
import Modal from 'nav-frontend-modal';
import {
Innholdstittel,
Normaltekst
} from 'nav-frontend-typografi';
import { IntlMessage } from '../utils/intl-utils';

Modal.setAppElement('#applikasjon');

function TomPortefoljeModal({ skjulModal, visModal }) {
    const modal = (
        <Modal
            contentLabel="Modal tom portefølje"
            isOpen={visModal}
            onRequestClose={skjulModal}
            closeButton={false}
        >
            <Innholdstittel tag="h1" style={{ paddingRight: '3rem' }}>
                <IntlMessage id="modal.tittel" />
            </Innholdstittel>
            <Normaltekst className="blokk-s">
                <IntlMessage id="modal.infotekst" />
            </Normaltekst>
            <button className="knapp knapp--hoved" onClick={skjulModal}>
                <IntlMessage id="modal.knapptekst" />
            </button>
        </Modal>
    );
    return (
        <div>{modal}</div>
    );
}

TomPortefoljeModal.propTypes = {
    skjulModal: PT.func.isRequired,
    visModal: PT.bool.isRequired
};

export default TomPortefoljeModal;
