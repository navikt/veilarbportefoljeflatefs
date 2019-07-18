import { default as React, Dispatch, SetStateAction, useState, useEffect } from 'react';
import { default as TourModal, ModalName } from '../tour-modal/tour-modal';
import { Knapp } from 'nav-frontend-knapper';

interface ModalStepperProps {
    modal: ModalName;
    setModalOpen: Dispatch<SetStateAction<boolean>>;
    modalOpen: boolean;
}

export default function TourModalButton(props: ModalStepperProps) {
    const [open, setOpen] = useState(false);
    if (!props.modalOpen && open) {
        setOpen(false);
    }

    return (
        <>
            <Knapp className="endringslogg-stepperKnapp" mini={true} onClick={() => {
                props.setModalOpen(!props.modalOpen);
                setOpen(!open);
            }}>
                Se hvordan
            </Knapp>
            <TourModal
                apen={open}
                modalNavn={props.modal}
                setApenModal={props.setModalOpen}
            />
        </>
    );
}