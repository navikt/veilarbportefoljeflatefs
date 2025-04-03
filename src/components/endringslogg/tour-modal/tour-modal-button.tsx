import {useState} from 'react';
import {Button} from '@navikt/ds-react';
import {TourModal} from './tour-modal';
import {trackModalOpen} from '../utils/utils';
import {ModalType} from '../utils/endringslogg-custom';
import '../endringslogg.css';

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
