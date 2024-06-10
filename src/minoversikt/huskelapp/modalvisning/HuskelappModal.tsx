import React from 'react';
import {Button, Modal} from '@navikt/ds-react';
import {BrukerModell} from '../../../model-interfaces';
import {ReactComponent as HuskelappIkon} from '../../../components/ikoner/huskelapp/Huskelappikon_bakgrunnsfarge.svg';
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
        <Modal
            header={{
                icon: <HuskelappIkon aria-hidden />,
                heading: 'Huskelapp',
                size: 'small'
            }}
            open={open}
            onClose={onClose}
            closeOnBackdropClick={true}
            className="huskelappvisning-modal"
        >
            <Modal.Body className="huskelappvisning-modal__body">
                <HuskelappForModal huskelapp={bruker.huskelapp!} />
            </Modal.Body>
            <Modal.Footer className="huskelappvisning-modal__footer">
                <Button type="button" size="small" variant="primary" onClick={redigerHuskelapp}>
                    Endre
                </Button>
                <SlettHuskelappKnapp bruker={bruker} lukkModal={lukkHuskelappModal} />
            </Modal.Footer>
        </Modal>
    );
};
