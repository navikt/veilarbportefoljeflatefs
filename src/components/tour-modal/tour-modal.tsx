import { default as React, useState, Dispatch, SetStateAction } from 'react';
import NavFrontendModal from 'nav-frontend-modal';
import { Normaltekst, Systemtittel, Undertittel } from 'nav-frontend-typografi';
import ChevronLenke, { Retning } from '../chevron-lenke/chevron-lenke';
import Stegviser from '../stegviser/stegviser';
import './tour-modal.less';

export enum modalName{
    LAST_NED_CV = 'TOUR_MODAL-LAST_NED_CV'
}

export interface Step {
    tittel: string;
    tekst: string;
    bilde: string;
}
interface TourModalProps {
    steps: Step[];
    setModalOpen?: Dispatch<SetStateAction<boolean>>;
}

function TourModal(props: TourModalProps){
    const [state, setState] = useState({
            modalOpen: true,
            selectedStepIdx: 0
        });

    const lukkModal = (finishedTour: boolean) => {
        setState({ modalOpen: false, selectedStepIdx: state.selectedStepIdx});
        if(props.setModalOpen){
            props.setModalOpen(false);
        }
    };

    const handleOnRequestClose = () => {
        lukkModal(false);
    };

    const handlePreviousBtnClicked = () => {
        setState({modalOpen: state.modalOpen, selectedStepIdx: state.selectedStepIdx - 1 });
    };

    const handleNextBtnClicked = () => {
        setState({modalOpen: state.modalOpen, selectedStepIdx: state.selectedStepIdx + 1 });
    };

    const handleFinishBtnClicked = () => {
        lukkModal(true);
    };

    
    const { selectedStepIdx, modalOpen } = state;
    const step = props.steps[selectedStepIdx];
    const isFinalStep = selectedStepIdx === props.steps.length - 1;

    const hidePrevBtn = selectedStepIdx === 0;
    const nextBtnText = isFinalStep ? "Ferdig" : "Neste";
    const nextBtnHandleClick = isFinalStep ? handleFinishBtnClicked : handleNextBtnClicked;

    return (
        <NavFrontendModal
            className="tour-modal"
            contentLabel="TourModal"
            isOpen={modalOpen}
            closeButton={true}
            shouldCloseOnOverlayClick={true}
            onRequestClose={handleOnRequestClose}
        >
            <div className="tour-modal__header--wrapper">
            <header className="tour-modal__header">
                <Systemtittel>Ny oppdatering</Systemtittel>
            </header>
            </div>
            <main className="tour-modal__main">
                <div className="tour-modal__main--bilde-wrapper">
                    <img src={step.bilde} className="tour-modal__main--bilde"/>
                </div>
                <div className="tour-modal__main--beskrivelse">
                    <Undertittel className="blokk-xxxs">{step.tittel}</Undertittel>
                    <Normaltekst className="tour-modal__main--tekst">{step.tekst}</Normaltekst>
                </div>
            </main>
            <footer className="tour-modal__footer">
                <ChevronLenke retning={Retning.VENSTRE} hide={hidePrevBtn} tekst="Forrige" onClick={handlePreviousBtnClicked}/>
                <Stegviser antallSteg={props.steps.length} valgtSteg={selectedStepIdx}/>
                <ChevronLenke retning={Retning.HOYRE} tekst={nextBtnText} onClick={nextBtnHandleClick}/>
            </footer>
        </NavFrontendModal>
    );  
}

export function hasStored(tagName: string) {
    return window.localStorage.getItem(tagName) !== null;
}

export default TourModal;
