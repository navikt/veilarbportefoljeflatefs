import React from 'react';
import {Modal} from '@navikt/ds-react';
import {HuskelappModalHeader} from './HuskelappModalHeader';
import {BrukerModell, HuskelappModell} from '../../model-interfaces';
import {LagEllerEndreHuskelappForm} from './LagEllerEndreHuskelappForm';
import './huskelapp.css';

interface Props {
    onModalClose: () => void;
    isModalOpen: boolean;
    huskelapp: HuskelappModell;
    bruker: BrukerModell;
}

export const LagEllerEndreHuskelappModal = ({isModalOpen, onModalClose, huskelapp, bruker}: Props) => (
    <Modal className="LagEllerEndreHuskelappModal" open={isModalOpen} onClose={onModalClose}>
        <Modal.Content>
            <HuskelappModalHeader />
            <LagEllerEndreHuskelappForm huskelapp={huskelapp} onModalClose={onModalClose} bruker={bruker} />
        </Modal.Content>
    </Modal>
);
