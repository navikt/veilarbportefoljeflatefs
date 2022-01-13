import * as React from 'react';
import {Normaltekst, Undertittel} from 'nav-frontend-typografi';
import {VarselModal, VarselModalType} from './varselmodal/varselmodal';
import './feilmelding-brukere.less';
import {useState} from 'react';
import {Button} from '@navikt/ds-react';

interface ServerFeilModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ServerFeilModal(props: ServerFeilModalProps) {
    const [isOpen, setIsOpen] = useState(props.isOpen);

    const lukkModal = () => {
        props.onClose();
        setIsOpen(false);
    };

    return (
        <VarselModal
            contentLabel="Fikk feil fra server"
            isOpen={isOpen}
            onRequestClose={lukkModal}
            closeButton={false}
            type={VarselModalType.FEIL}
            portalClassName="tildeling-veileder-modal"
        >
            <div className="server-feil-modal">
                <Undertittel tag="h1" className="blokk-xxs">
                    Handlingen kan ikke utføres
                </Undertittel>
                <Normaltekst className="blokk-s">Noe gikk feil, prøv igjen senere.</Normaltekst>
                <Button className="knapp knapp--hoved blokk-s" onClick={lukkModal}>
                    Ok
                </Button>
            </div>
        </VarselModal>
    );
}
