import React, { PropTypes as PT } from 'react';
import Modal from 'nav-frontend-modal';
import { Innholdstittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import RedigerArbeidslisteForm from './rediger-arbeidsliste-form';
import { brukerShape } from '../proptype-shapes';

Modal.setAppElement('#applikasjon');

function ArbeidslisteModalRediger({ bruker, isOpen, lukkModal, innloggetVeileder, ...props }) {
    return (
        <Modal
            className="modal_overflow"
            contentLabel="arbeidsliste"
            isOpen={isOpen || false}
            onRequestClose={lukkModal}
            closeButton
        >
            <div className="arbeidsliste__modal">
                <Innholdstittel tag="h1" className="blokk-xs">
                    <FormattedMessage id="modal.rediger.arbeidsliste.tittel" />
                </Innholdstittel>
                <RedigerArbeidslisteForm
                    bruker={bruker}
                    lukkModal={lukkModal}
                    innloggetVeileder={innloggetVeileder}
                    {...props}
                />
            </div>

        </Modal>);
}

ArbeidslisteModalRediger.propTypes = {
    isOpen: PT.bool.isRequired,
    bruker: brukerShape.isRequired,
    lukkModal: PT.func.isRequired,
    innloggetVeileder: PT.string.isRequired,
    sistEndretDato: PT.string.isRequired,
    sistEndretAv: PT.string
};

export default ArbeidslisteModalRediger;
