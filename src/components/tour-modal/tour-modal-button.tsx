import { default as React, useState } from 'react';
import { default as TourModal, ModalName } from '../tour-modal/tour-modal';
import { Knapp } from 'nav-frontend-knapper';
import { logEvent } from '../../utils/frontend-logger';

interface ModalStepperProps {
    modal: ModalName;
    metrikknavn: string;
    knappeTekst ?: string;
}

export default function TourModalButton(props: ModalStepperProps) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Knapp className="endringslogg-stepperKnapp" mini={true} onClick={() => {
                setOpen(true);
                logEvent(props.metrikknavn);
            }}>
                {props.knappeTekst ? props.knappeTekst : 'Se hvordan'}
            </Knapp>
            <TourModal
                open={open}
                modalName={props.modal}
                onClose={() => setOpen(false)}
            />
        </>
    );
}
