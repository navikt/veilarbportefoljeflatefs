import { default as React, useState } from 'react';
import { default as TourModal, ModalName, } from './tour-modal';
import {useFeatureSelector} from "../../../hooks/redux/use-feature-selector";
import {PERM_UTEN_OPPFOLGINGSVEDTAK} from "../../../konstanter";

interface TourModalLocalStorageProps {
    onTourComplete?: (e: string) => void;
}

export default function TourModalLocalStorage(props: TourModalLocalStorageProps) {
    const modalNavn = ModalName.PERMITTERTE;
    const erFilterPa = useFeatureSelector()(PERM_UTEN_OPPFOLGINGSVEDTAK);
    const [openModal, setApenModal] = useState(!hasStored(modalNavn) && erFilterPa);

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
