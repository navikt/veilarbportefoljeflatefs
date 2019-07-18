import { default as React, useState, Dispatch, SetStateAction } from 'react';
import { default as TourModal, ModalName, } from './tour-modal';

export default function TourModalLocalStorage(){
    const modalNavn = ModalName.MOTE_FILTER;
    const [openModal, setApenModal] = useState(!hasStored(modalNavn));
    return(
        <TourModal
            apen = { openModal }
            modalNavn = {modalNavn}
            setApenModal = {setApenModal}
        />
    )
}

export function hasStored(tagName: string): boolean {
    return window.localStorage.getItem(tagName) !== null;
}
