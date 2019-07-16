import { default as React, useState } from 'react';
import NavFrontendModal from 'nav-frontend-modal';
import { Normaltekst, Systemtittel, Undertittel } from 'nav-frontend-typografi';
import ChevronLenke, { Retning } from '../chevron-lenke/chevron-lenke';
import Stegviser from '../stegviser/stegviser';
import step1Bilde from './step-1.png';
import './tour-modal.less';

const modalName = 'TOUR_MODAL-LAST_NED_CV';

const steps: Step[] = [
    {
        tittel: 'Nytt status filter' , 
        bilde: step1Bilde,
        tekst: 'Det er nå lettere å filtrere på hvem som har oppkommende møter med NAV.'
    },
    {
        tittel: 'Enklere oversikt' ,
        bilde: step1Bilde,
        tekst: 'Resultatet blir en sortert liste med navn og møte tid.'
    },
];

interface Step {
    tittel: string;
    tekst: string;
    bilde: string;
}

interface TourModalState {
    selectedStepIdx: number;
    modalOpen: boolean;
}

function TourModal(){
    const [state, setState] = useState({
            modalOpen: true,
            selectedStepIdx: 0
        });

    //private metrics: TourModalMetrics = new TourModalMetrics(steps.length);

    const lagreIkkeVisModal = () => {
        window.localStorage.setItem(modalName, 'true');
    };

    const lukkModal = (finishedTour: boolean) => {
        //this.metrics.setTimeSpent(this.state.selectedStepIdx);
        //this.metrics.log(finishedTour);
        setState({ modalOpen: false, selectedStepIdx: state.selectedStepIdx});
        lagreIkkeVisModal();
    };

    const handleOnRequestClose = () => {
        lukkModal(false);
    };

    const handlePreviousBtnClicked = () => {
        setState({modalOpen: state.modalOpen, selectedStepIdx: state.selectedStepIdx - 1 });
    };

    const handleNextBtnClicked = () => {
        //this.metrics.setTimeSpent(state.selectedStepIdx);
        setState({modalOpen: state.modalOpen, selectedStepIdx: state.selectedStepIdx + 1 });
    };

    const handleFinishBtnClicked = () => {
        lukkModal(true);
    };

    
    const { selectedStepIdx, modalOpen } = state;
    const step = steps[selectedStepIdx];
    const isFinalStep = selectedStepIdx === steps.length - 1;

    const hidePrevBtn = selectedStepIdx === 0;
    const nextBtnText = isFinalStep ? "Ferdig" : "Neste";
    const nextBtnHandleClick = isFinalStep ? handleFinishBtnClicked : handleNextBtnClicked;

    return (
        <NavFrontendModal
            className="tour-modal"
            contentLabel="TourModal"
            isOpen={modalOpen}
            closeButton={true}
            shouldCloseOnOverlayClick={false}
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
                <Stegviser antallSteg={steps.length} valgtSteg={selectedStepIdx}/>
                <ChevronLenke retning={Retning.HOYRE} tekst={nextBtnText} onClick={nextBtnHandleClick}/>
            </footer>
        </NavFrontendModal>
    );  
}

export function hasStored(tagName: string) {
    return window.localStorage.getItem(tagName) !== null;
}

export default TourModal;
