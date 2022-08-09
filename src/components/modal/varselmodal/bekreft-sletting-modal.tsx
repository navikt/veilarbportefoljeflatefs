import React from 'react';
import {VarselModal, VarselModalType} from './varselmodal';
import {BodyShort, Button, Heading} from '@navikt/ds-react';
import {Delete} from '@navikt/ds-icons';
import './varsel-modal.css';

interface BekreftSlettingModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    onSubmit: () => void;
    tittel: string;
    infoTekst?: string;
    navn: string;
}

function BekreftSlettingModal(props: BekreftSlettingModalProps) {
    const slettKnapp = () => {
        props.onSubmit();
        props.onRequestClose();
    };

    return (
        <VarselModal
            isOpen={props.isOpen}
            onClose={props.onRequestClose}
            className="bekreft-sletting-modal"
            type={VarselModalType.ADVARSEL}
        >
            <div className="bekreft-sletting-modal__tekstgruppe">
                <Heading size="large" level="1">
                    {props.tittel}
                </Heading>
                {props.infoTekst && <BodyShort size="small">{props.infoTekst}</BodyShort>}
                <BodyShort size="small">
                    Er du sikker på at du vil slette <b>{props.navn}</b>?
                </BodyShort>
            </div>
            <div className="bekreft-sletting-modal__knappegruppe">
                <Button
                    variant="danger"
                    type="submit"
                    onClick={slettKnapp}
                    data-testid="bekreft-sletting_modal_slett-knapp"
                >
                    <Delete />
                    Slett
                </Button>
                <Button variant="secondary" type="button" onClick={props.onRequestClose}>
                    Avbryt
                </Button>
            </div>
        </VarselModal>
    );
}

export default BekreftSlettingModal;
