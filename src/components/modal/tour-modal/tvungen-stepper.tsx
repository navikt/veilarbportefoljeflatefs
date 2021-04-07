import {default as React, useState} from 'react';
import {default as TourModal, ModalName} from './tour-modal';

interface TourModalLocalStorageProps {
    onTourComplete?: (e: string) => void;
    skalVises?: boolean;
}

export default function TvungenStepper({onTourComplete, skalVises = false}: TourModalLocalStorageProps) {
    const modalNavn = ModalName.SISTE_ENDRING;
    const [openModal, setApenModal] = useState(!hasStored(modalNavn));

    const lagreIkkeVisModal = () => {
        window.localStorage.setItem(modalNavn, 'true');
    };

    const lukkModal = (isFinalStep: boolean) => {
        lagreIkkeVisModal();
        if (isFinalStep && onTourComplete) {
            onTourComplete(modalNavn);
        }
        setApenModal(false);
    };

    return <>{skalVises && <TourModal open={openModal} modalName={modalNavn} onClose={lukkModal} />}</>;
}

export function hasStored(tagName: string): boolean {
    return window.localStorage.getItem(tagName) !== null;
}
