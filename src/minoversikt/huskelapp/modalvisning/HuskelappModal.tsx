import React from 'react';
import {Button, Heading, Modal} from '@navikt/ds-react';
import {BrukerModell} from '../../../model-interfaces';
import {ReactComponent as HuskelappIkon} from '../../../components/ikoner/huskelapp/huskelapp.svg';
import {HuskelappForModal} from './HuskelappForModal';
import {SlettHuskelappKnapp} from './SlettHuskelappKnapp';
import './modalvisning.css';

interface HuskelappModalParams {
    open: boolean;
    onClose: () => void;
    bruker: BrukerModell;
    redigerHuskelapp: () => void;
    lukkHuskelappModal: () => void;
}

export const HuskelappModal = ({open, onClose, bruker, redigerHuskelapp, lukkHuskelappModal}: HuskelappModalParams) => {
    return (
        <Modal open={open} onClose={onClose} closeOnBackdropClick={true} className="huskelappvisning-modal">
            <Modal.Header>
                <Heading size="medium" level="1" spacing className="huskelapp-modal__heading">
                    <HuskelappIkon aria-hidden={true} />
                    Huskelapp
                </Heading>
            </Modal.Header>
            <Modal.Body className="huskelappvisning-modal__body">
                <HuskelappForModal huskelapp={bruker.huskelapp!!} />
            </Modal.Body>
            <Modal.Footer>
                <Button type="button" size="small" variant="primary" onClick={redigerHuskelapp}>
                    Endre
                </Button>
                <SlettHuskelappKnapp bruker={bruker} lukkModal={lukkHuskelappModal} />
            </Modal.Footer>
        </Modal>
    );
};
