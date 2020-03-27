import { default as React, useState } from 'react';
import { default as TourModal, ModalName, } from './tour-modal';

interface TourModalLocalStorageProps {
    onTourComplete?: (e: string) => void;
}

export default function TourModalLocalStorage(props: TourModalLocalStorageProps) {
    const modalNavn = ModalName.PERMITTERTE;
    const [openModal, setApenModal] = useState(!hasStored(modalNavn));

    const lagreIkkeVisModal = () => {
        window.localStorage.setItem(modalNavn, 'true');
    };

    const lukkModal = (isFinalStep: boolean) => {
        lagreIkkeVisModal();
        if (isFinalStep && props.onTourComplete) {
            props.onTourComplete(modalNavn);
        }
        setApenModal(false);
    };

    return (
        <TourModal
            open={openModal}
            modalName={modalNavn}
            onClose={lukkModal}
        />
    );
}

export function hasStored(tagName: string): boolean {
    return window.localStorage.getItem(tagName) !== null;
}
