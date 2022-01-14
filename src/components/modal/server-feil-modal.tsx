import * as React from 'react';
import {VarselModal, VarselModalType} from './varselmodal/varselmodal';
import './feilmelding-brukere.less';
import {useState} from 'react';
import {BodyShort, Button, Heading} from '@navikt/ds-react';

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
                <Heading size="small" level="1">
                    Handlingen kan ikke utføres
                </Heading>
                <BodyShort>Noe gikk feil, prøv igjen senere.</BodyShort>
                <Button className="knapp knapp--hoved " onClick={lukkModal}>
                    Ok
                </Button>
            </div>
        </VarselModal>
    );
}
