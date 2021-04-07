import {default as React, useState} from 'react';
import NavFrontendModal from 'nav-frontend-modal';
import {Normaltekst, Systemtittel, Undertittel} from 'nav-frontend-typografi';
import ChevronLenke, {Retning} from '../../chevron-lenke/chevron-lenke';
import Stegviser from '../../stegviser/stegviser';
import './tour-modal.less';
import {getTitle, getTour} from './tour-modal-custom/tour-modal-custom';

export enum ModalName {
    MINE_FILTER = 'TOUR_MODAL-MINE_FILTER',
    TILRETTELEGGING = 'TOUR_MODAL-TILRETTELEGGING',
    SISTE_ENDRING = 'TOUR_MODAL-SISTE_ENDRING'
}

export interface TourModalConfig {
    steps: Step[];
    modalTittel?: string;
}
export interface Step {
    tittel: string;
    tekst: React.ReactNode;
    bilde: string;
    altTekst: string;
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
    if (!steps) return null;
    const step = steps[stepIndex];
    const isFinalStep = stepIndex === steps.length - 1;

    const hidePrevBtn = stepIndex === 0;
    const nextBtnText = isFinalStep ? 'Ferdig' : 'Neste';
    const nextBtnHandleClick = isFinalStep ? lukkModal : handleNextBtnClicked;
    const systemtittel =
        getTitle(props.modalName) === '' || getTitle(props.modalName) === undefined
            ? 'Ny oppdatering'
            : getTitle(props.modalName);

    return (
        <NavFrontendModal
            className="tour-modal"
            contentLabel="TourModal"
            isOpen={props.open}
            closeButton
            shouldCloseOnOverlayClick
            onRequestClose={lukkModal}
        >
            <div className="tour-modal__header--wrapper" data-testid="endringslogg_tour-modal">
                <header className="tour-modal__header">
                    <Systemtittel>{systemtittel}</Systemtittel>
                </header>
            </div>
            <main className="tour-modal__main">
                <div className="tour-modal__main--bilde-wrapper">
                    <img alt={step.altTekst} src={step.bilde} className="tour-modal__main--bilde" />
                </div>
                <div className="tour-modal__main--beskrivelse">
                    <Undertittel className="blokk-xxxs">{step.tittel}</Undertittel>
                    <Normaltekst className="tour-modal__main--tekst">{step.tekst}</Normaltekst>
                </div>
            </main>
            <footer className="tour-modal__footer">
                <ChevronLenke
                    retning={Retning.VENSTRE}
                    tekst="Forrige"
                    hide={hidePrevBtn}
                    onClick={handlePreviousBtnClicked}
                    dataTestId="endringslogg_forrige-knapp"
                />
                <Stegviser antallSteg={steps.length} valgtSteg={stepIndex} />
                <ChevronLenke
                    retning={Retning.HOYRE}
                    tekst={nextBtnText}
                    onClick={nextBtnHandleClick}
                    dataTestId={isFinalStep ? 'endringslogg_ferdig-knapp' : 'endringslogg_neste-knapp'}
                />
            </footer>
        </NavFrontendModal>
    );
}

export default TourModal;
