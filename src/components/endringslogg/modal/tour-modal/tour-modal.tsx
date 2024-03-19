import {default as React, useState} from 'react';
import './tour-modal.css';
import ChevronLenke, {Direction} from '../../chevron-lenke/chevron-lenke';
import Stegviser from '../../stegviser/stegviser';
import {ModalType} from '../../utils/endringslogg-custom';
import BlockContent from '@sanity/block-content-to-react';
import {Heading, Modal} from '@navikt/ds-react';

interface TourModalProps {
    modal: ModalType;
    open: boolean;
    onClose: (e: boolean) => void;
}

const TourModal = ({modal, open, onClose}: TourModalProps) => {
    const [stepIndex, setStepIndex] = useState(0);
    const lukkModal = () => {
        setStepIndex(0);
        onClose(isFinalStep);
    };

    const handlePreviousBtnClicked = () => {
        setStepIndex(stepIndex - 1);
    };

    const handleNextBtnClicked = () => {
        setStepIndex(stepIndex + 1);
    };

    const steps = modal.slides;
    if (!steps) {
        return null;
    }
    const step = steps[stepIndex];
    const isFinalStep = stepIndex === steps.length - 1;

    const hidePrevBtn = stepIndex === 0;
    const nextBtnText = isFinalStep ? 'Ferdig' : 'Neste';
    const nextBtnHandleClick = isFinalStep ? lukkModal : handleNextBtnClicked;

    const modalTittel = modal?.header ? modal.header : 'Ny oppdatering';

    return (
        <Modal className={'tour-modal'} open={open} onClose={lukkModal}>
            <Modal.Body>
                <div className={'tour-modal__header--wrapper'} data-testid="endringslogg_tour-modal">
                    <header className={'tour-modal__header'}>
                        <Heading size="medium" level="1">
                            {modalTittel}
                        </Heading>
                    </header>
                </div>
                <main className={'tour-modal__main'}>
                    <div className={'tour-modal__main--bilde-wrapper'}>
                        {step.slideImage && (
                            <img
                                alt={step.altText}
                                src={`data:image/jpeg;base64,${step.slideImage}`}
                                className={'tour-modal__main--bilde'}
                                onClick={() => {
                                    const data = `data:image/png;base64,${step.slideImage}`;
                                    const newWindow = window.open('about:blank');
                                    const image = new Image();
                                    image.src = data;
                                    setTimeout(() => {
                                        newWindow?.document?.write(image.outerHTML);
                                    }, 0);
                                }}
                            />
                        )}
                    </div>
                    <div className={'tour-modal__main--beskrivelse'}>
                        <Heading size="small">{step.slideHeader}</Heading>
                        {step.slideDescription && (
                            <div className={'tour-modal__main--tekst'}>
                                <BlockContent blocks={step.slideDescription} />
                            </div>
                        )}
                    </div>
                </main>
                <footer className={'tour-modal__footer'}>
                    <ChevronLenke
                        retning={Direction.LEFT}
                        tekst="Forrige"
                        hide={hidePrevBtn}
                        onClick={handlePreviousBtnClicked}
                        dataTestId="endringslogg_forrige-knapp"
                    />
                    <Stegviser antallSteg={steps.length} valgtSteg={stepIndex} />
                    <ChevronLenke
                        retning={Direction.RIGHT}
                        tekst={nextBtnText}
                        onClick={nextBtnHandleClick}
                        dataTestId={isFinalStep ? 'endringslogg_ferdig-knapp' : 'endringslogg_neste-knapp'}
                    />
                </footer>
            </Modal.Body>
        </Modal>
    );
};

export default TourModal;
