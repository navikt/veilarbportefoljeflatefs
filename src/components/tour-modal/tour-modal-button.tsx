import { default as React, Dispatch, SetStateAction, useState, useEffect } from 'react';
import { default as TourModal, ModalName } from '../tour-modal/tour-modal';
import { Knapp } from 'nav-frontend-knapper';

interface ModalStepperProps {
    modal: ModalName;
    loggApen: Dispatch<SetStateAction<boolean>>;
}

export default function TourModalButton(props: ModalStepperProps) {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Knapp className="endringslogg-stepperKnapp" mini={true} onClick={() => {
                setOpen(true);
                props.loggApen(true);
            }}>
                Se hvordan
            </Knapp>
            <TourModal
                apen={open}
                modalNavn={props.modal}
                setOpen={setOpen}
            />
        </>
    );
}
