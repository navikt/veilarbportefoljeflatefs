import React, {useState} from 'react';
import {default as TourModal} from './tour-modal';
import '../../endringslogg.less';
import {trackModalOpen} from '../../utils/utils';
import {Button} from '@navikt/ds-react';
import {ModalType} from '../../utils/endringslogg-custom';

interface ModalStepperProps {
    modal: ModalType;
    id: string;
    buttonText?: string;
    forced?: boolean;
}

export const TourModalButton = (props: ModalStepperProps) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button
                variant="secondary"
                className={'endringslogg-stepperKnapp'}
                type="button"
                onClick={() => {
                    setOpen(true);
                    trackModalOpen(props.id);
                }}
            >
                <b>{props.buttonText ? props.buttonText : 'Se hvordan'}</b>
            </Button>
            <TourModal open={open} modal={props.modal} onClose={() => setOpen(false)} />
        </>
    );
};
