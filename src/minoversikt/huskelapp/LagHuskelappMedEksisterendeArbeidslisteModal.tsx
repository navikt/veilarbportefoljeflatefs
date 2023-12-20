import React from 'react';
import {Modal} from '@navikt/ds-react';
import {HuskelappModalHeader} from './HuskelappModalHeader';
import {LagEllerEndreHuskelappForm} from './LagEllerEndreHuskelappForm';
import {ArbeidslisteModell, HuskelappModell} from '../../model-interfaces';
import {EksisterendeArbeidslisteVisning} from './EksisterendeArbeidslisteVisning';
import './huskelapp.css';
interface Props {
    onModalClose: () => void;
    isModalOpen: boolean;
    huskelapp: HuskelappModell;
    arbeidsliste: ArbeidslisteModell;
}
export const LagHuskelappMedEksisterendeArbeidslisteModal = ({
    onModalClose,
    isModalOpen,
    huskelapp,
    arbeidsliste
}: Props) => {
    return (
        <Modal className="lagHuskelappMedEksisterendeArbeidslisteModal" open={isModalOpen} onClose={onModalClose}>
            <Modal.Content>
                <HuskelappModalHeader />
                <div className="huskelapp-modal-content">
                    <LagEllerEndreHuskelappForm huskelapp={huskelapp} onModalClose={onModalClose} />
                    <EksisterendeArbeidslisteVisning arbeidsliste={arbeidsliste} />
                </div>
            </Modal.Content>
        </Modal>
    );
};
