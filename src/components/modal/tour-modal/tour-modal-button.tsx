import {default as React, useState} from 'react';
import {default as TourModal, ModalName} from './tour-modal';
import {logEvent} from '../../../utils/frontend-logger';
import './tour-modal.less';
import classNames from 'classnames';
import {Button} from '@navikt/ds-react';

interface ModalStepperProps {
    modal: ModalName;
    knappeTekst?: string;
    className?: string;
    systemtittel?: string;
}

export default function TourModalButton(props: ModalStepperProps) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button
                variant="secondary"
                className={classNames('endringslogg-stepperKnapp', props.className)}
                data-testid="endringslogg_se-hvordan-knapp"
                onClick={() => {
                    setOpen(true);
                    logEvent('portefolje.endringslogg_stepper', {modal: props.modal});
                }}
            >
                {props.knappeTekst ? props.knappeTekst : 'Se hvordan'}
            </Button>
            <TourModal open={open} modalName={props.modal} onClose={() => setOpen(false)} />
        </>
    );
}
