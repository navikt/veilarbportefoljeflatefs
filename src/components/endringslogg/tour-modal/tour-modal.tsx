import {useState} from 'react';
import BlockContent from '@sanity/block-content-to-react';
import {Button, Heading, Modal} from '@navikt/ds-react';
import {ArrowLeftIcon, ArrowRightIcon} from '@navikt/aksel-icons';
import {Stegviser} from '../stegviser/stegviser';
import {ModalType} from '../utils/endringslogg-custom';
import './tour-modal.css';

interface TourModalProps {
    modal: ModalType;
    open: boolean;
    onClose: (e: boolean) => void;
}

export const TourModal = ({modal, open, onClose}: TourModalProps) => {
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

    const showPrevBtn = stepIndex !== 0;
    const nextBtnText = isFinalStep ? 'Ferdig' : 'Neste';
    const nextBtnHandleClick = isFinalStep ? lukkModal : handleNextBtnClicked;

    const modalTittel = modal?.header ? modal.header : 'Ny oppdatering';

    return (
        <Modal
            className="tour-modal"
            open={open}
            onClose={lukkModal}
            closeOnBackdropClick={true}
            aria-labelledby="tour-modal-overskrift"
        >
            <Modal.Header data-testid="endringslogg_tour-modal">
                <Heading id="tour-modal-overskrift" size="medium" level="1">
                    {modalTittel}
                </Heading>
            </Modal.Header>
            <Modal.Body>
                <main className={'tour-modal__main'}>
                    <div className={'tour-modal__main--bilde-wrapper'}>
                        {step.slideImage && (
                            <img
                                alt={step.altText}
                                src={`data:image/jpeg;base64,${step.slideImage}`}
                                className={'tour-modal__main--bilde'}
                            />
                        )}
                    </div>
                    <div className={'tour-modal__main--beskrivelse'}>
                        <Heading size="small">{step.slideHeader}</Heading>
                        {step.slideDescription && <BlockContent blocks={step.slideDescription} />}
                    </div>
                </main>
                <footer className={'tour-modal__footer'}>
                    {showPrevBtn && (
                        <Button
                            icon={<ArrowLeftIcon aria-hidden={true} />}
                            onClick={handlePreviousBtnClicked}
                            data-testid="endringslogg_forrige-knapp"
                            variant="tertiary"
                            size="small"
                        >
                            Forrige
                        </Button>
                    )}
                    <Stegviser antallSteg={steps.length} valgtSteg={stepIndex} />
                    <Button
                        icon={<ArrowRightIcon aria-hidden={true} />}
                        onClick={nextBtnHandleClick}
                        data-testid={isFinalStep ? 'endringslogg_ferdig-knapp' : 'endringslogg_neste-knapp'}
                        variant="tertiary"
                        size="small"
                    >
                        {nextBtnText}
                    </Button>
                </footer>
            </Modal.Body>
        </Modal>
    );
};
