import React from 'react';
import {Modal} from '@navikt/ds-react';
import {HuskelappModalHeader} from './HuskelappModalHeader';
import {HuskelappModell} from '../../model-interfaces';
import {LagEllerEndreHuskelappForm} from './LagEllerEndreHuskelappForm';
import './huskelapp.css';

interface Props {
    onModalClose: () => void;
    isModalOpen: boolean;
    huskelapp: HuskelappModell;
}

export const LagEllerEndreHuskelappModal = ({isModalOpen, onModalClose, huskelapp}: Props) => (
    <Modal className="LagEllerEndreHuskelappModal" open={isModalOpen} onClose={onModalClose}>
        <Modal.Content>
            <HuskelappModalHeader />
            <LagEllerEndreHuskelappForm huskelapp={huskelapp} onModalClose={onModalClose} />
        </Modal.Content>
    </Modal>
);
