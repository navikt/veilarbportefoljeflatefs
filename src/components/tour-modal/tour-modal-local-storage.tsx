import { default as React, useState } from 'react';
import { default as TourModal, ModalName, } from './tour-modal';
import { registrerHarLestEndringslogg } from '../endringslogg/endringslogg-utils';

interface TourModalLocalStorageProps {
    completed: (e: string) => void;
}

export default function TourModalLocalStorage(props: TourModalLocalStorageProps) {
    const modalNavn = ModalName.MOTE_FILTER;
    const [openModal, setApenModal] = useState(!hasStored(modalNavn));

    const lagreIkkeVisModal = () => {
        window.localStorage.setItem(modalNavn, 'true');
    };

    const lukkModal = (isFinalStep: boolean) => {
        lagreIkkeVisModal();
        if (isFinalStep) {
            registrerHarLestEndringslogg(modalNavn);
            if (props.completed) {
                props.completed(modalNavn);
            }
        }
        setApenModal(false);
    };

    return(
        <TourModal
            open={ openModal }
            modalName={ modalNavn }
            onClose={ lukkModal }
        />
    );
}

export function hasStored(tagName: string): boolean {
    return window.localStorage.getItem(tagName) !== null;
}
