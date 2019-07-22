import { default as React, useState } from 'react';
import { default as TourModal, ModalName, } from './tour-modal';

interface TourModalLocalStorageProps {
    completed: (e: string) => void;
}

export default function TourModalLocalStorage(props: TourModalLocalStorageProps) {
    const modalNavn = ModalName.MOTE_FILTER;
    const [openModal, setApenModal] = useState(!hasStored(modalNavn));
    return(
        <TourModal
            apen={ openModal }
            modalNavn={ modalNavn }
            setOpen={ setApenModal }
            completed={ props.completed }
        />
    );
}

export function hasStored(tagName: string): boolean {
    return window.localStorage.getItem(tagName) !== null;
}
