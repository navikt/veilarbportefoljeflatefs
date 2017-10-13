import * as React from 'react';
import NavFrontendModal from 'nav-frontend-modal';
import { Innholdstittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import RedigerArbeidslisteForm from './rediger-arbeidsliste-form';
import { brukerShape } from '../proptype-shapes';
import {BrukerModell} from "../model-interfaces";

NavFrontendModal.setAppElement('#applikasjon');

interface ArbeidslisteModalRedigerProps {
    isOpen: boolean;
    bruker: BrukerModell;
    lukkModal: () => void;
    innloggetVeileder: string;
    sistEndretDato: Date;
    sistEndretAv?: string;
}

function ArbeidslisteModalRediger({ bruker, isOpen, lukkModal, innloggetVeileder, ...props }: ArbeidslisteModalRedigerProps) {
    return (
        <NavFrontendModal
            className="arbeidsliste-modal modal_overflow"
            contentLabel="arbeidsliste"
            isOpen={isOpen || false}
            onRequestClose={lukkModal}
            closeButton
        >
            <div className="modal-header-wrapper">
                <header className="modal-header" />
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


export default ArbeidslisteModalRediger;
