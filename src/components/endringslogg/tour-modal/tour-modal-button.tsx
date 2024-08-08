import React, {useState} from 'react';
import {default as TourModal} from './tour-modal';
import '../endringslogg.css';
import {trackModalOpen} from '../utils/utils';
import {Button} from '@navikt/ds-react';
import {ModalType} from '../utils/endringslogg-custom';

interface ModalStepperProps {
    modal: ModalType;
    id: string;
    buttonText?: string;
}

export const TourModalButton = ({modal, id, buttonText}: ModalStepperProps) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button
                variant="secondary"
                className={'endringslogg-stepperKnapp'}
                type="button"
                size="small"
                onClick={() => {
                    setOpen(true);
                    trackModalOpen(id);
                }}
            >
                <b>{buttonText || 'Se hvordan'}</b>
            </Button>
            <TourModal open={open} modal={modal} onClose={() => setOpen(false)} />
        </>
    );
};
