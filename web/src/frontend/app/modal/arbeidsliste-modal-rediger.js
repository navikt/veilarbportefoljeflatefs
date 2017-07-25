
import React, { PropTypes as PT } from 'react';
import Modal from 'nav-frontend-modal';
import { Normaltekst, Innholdstittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import RedigerArbeidslisteForm from './rediger-arbeidsliste-form';
import { brukerShape } from '../proptype-shapes';

Modal.setAppElement('#applikasjon');

function ArbeidslisteModalRediger({ bruker, isOpen, lukkModal, innloggetVeileder }) {
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
                <Normaltekst className="blokk-s">
                    <FormattedMessage
                        id="modal.legg.til.arbeidsliste.infotekst"
                        values={{ antall: bruker.length }}
                    />
                </Normaltekst>
                <RedigerArbeidslisteForm
                    bruker={bruker}
                    lukkModal={lukkModal}
                    innloggetVeileder={innloggetVeileder}
                />
            </div>

        </Modal>);
}

ArbeidslisteModalRediger.propTypes = {
    isOpen: PT.bool.isRequired,
    bruker: brukerShape.isRequired,
    lukkModal: PT.func.isRequired,
    innloggetVeileder: PT.string.isRequired
};

export default ArbeidslisteModalRediger;
