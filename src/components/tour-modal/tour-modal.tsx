import { default as React, useState } from 'react';
import NavFrontendModal from 'nav-frontend-modal';
import { Normaltekst, Systemtittel, Undertittel } from 'nav-frontend-typografi';
import ChevronLenke, { Retning } from '../chevron-lenke/chevron-lenke';
import Stegviser from '../stegviser/stegviser';
import { getTour } from './tour-modal-custom/tour-modal-custom';
import './tour-modal.less';

export enum ModalName {
    LAST_NED_CV = 'TOUR_MODAL-LAST_NED_CV',
    MOTE_FILTER = 'TOUR_MODAL-MOTE_FILTER',
    FLYTTE_FILTER = 'TOUR_MODAL-FLYTTE_FILTER'
}

export interface Step {
    tittel: string;
    tekst: string;
    bilde: string;
}

interface TourModalProps {
    modalName: ModalName;
    open: boolean;
    onClose: (e: boolean) => void;
}

function TourModal(props: TourModalProps) {
    const [stepIndex, setStepIndex] = useState(0);

    const lukkModal = () => {
        props.onClose(isFinalStep);
    };

    const handlePreviousBtnClicked = () => {
        setStepIndex(stepIndex - 1);
    };

    const handleNextBtnClicked = () => {
        setStepIndex(stepIndex + 1);
    };

    const steps = getTour(props.modalName);
    const step = steps[stepIndex];
    const isFinalStep = stepIndex === steps.length - 1;

    const hidePrevBtn = stepIndex === 0;
    const nextBtnText = isFinalStep ? 'Ferdig' : 'Neste';
    const nextBtnHandleClick = isFinalStep ? lukkModal : handleNextBtnClicked;

    return (
        <NavFrontendModal
            className="tour-modal"
            contentLabel="TourModal"
            isOpen={props.open}
            closeButton={true}
            shouldCloseOnOverlayClick={true}
            onRequestClose={lukkModal}
        >
            <div className="tour-modal__header--wrapper">
                <header className="tour-modal__header">
                    <Systemtittel>Ny oppdatering</Systemtittel>
                </header>
            </div>
            <main className="tour-modal__main">
                <div className="tour-modal__main--bilde-wrapper">
                    <img
                        src={step.bilde}
                        className="tour-modal__main--bilde"
                    />
                </div>
                <div className="tour-modal__main--beskrivelse">
                    <Undertittel className="blokk-xxxs">{step.tittel}</Undertittel>
                    <Normaltekst className="tour-modal__main--tekst">{step.tekst}</Normaltekst>
                </div>
            </main>
            <footer className="tour-modal__footer">
                <ChevronLenke retning={Retning.VENSTRE} tekst="Forrige" hide={hidePrevBtn}
                              onClick={handlePreviousBtnClicked}/>
                <Stegviser antallSteg={steps.length} valgtSteg={stepIndex}/>
                <ChevronLenke retning={Retning.HOYRE} tekst={nextBtnText} onClick={nextBtnHandleClick}/>
            </footer>
        </NavFrontendModal>
    );
}

export default TourModal;
