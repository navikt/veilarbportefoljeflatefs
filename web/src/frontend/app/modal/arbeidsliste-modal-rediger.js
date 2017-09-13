import React, { PropTypes as PT } from 'react';
import NavFrontendModal from 'nav-frontend-modal';
import { Innholdstittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import RedigerArbeidslisteForm from './rediger-arbeidsliste-form';
import { brukerShape } from '../proptype-shapes';

NavFrontendModal.setAppElement('#applikasjon');

function ArbeidslisteModalRediger({ bruker, isOpen, lukkModal, innloggetVeileder, ...props }) {
    return (
        <NavFrontendModal
            className="arbeidsliste-modal modal_overflow"
            contentLabel="arbeidsliste"
            isOpen={isOpen || false}
            onRequestClose={lukkModal}
            closeButton
        >
            <div className="modal-header-wrapper">
                <header className="modal-header">

                </header>
            </div>
            <div className="arbeidsliste__modal">
                <div className="arbeidsliste-info-tekst">
                    <Innholdstittel tag="h1" className="blokk-xs">
                        <FormattedMessage id="modal.rediger.arbeidsliste.tittel" />
                    </Innholdstittel>
                </div>
                <RedigerArbeidslisteForm
                    bruker={bruker}
                    lukkModal={lukkModal}
                    innloggetVeileder={innloggetVeileder}
                    {...props}
                />
            </div>

        </NavFrontendModal>);
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
