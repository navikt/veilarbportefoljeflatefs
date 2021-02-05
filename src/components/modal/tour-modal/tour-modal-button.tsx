import {default as React, useState} from 'react';
import {default as TourModal, ModalName} from './tour-modal';
import {Knapp} from 'nav-frontend-knapper';
import {logEvent} from '../../../utils/frontend-logger';
import './tour-modal.less';
import classNames from 'classnames';
import {kebabCase} from '../../../utils/utils';

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
            <Knapp
                className={classNames('endringslogg-stepperKnapp', props.className)}
                mini
                data-testid="endringslogg_se-hvordan-knapp"
                onClick={() => {
                    setOpen(true);
                    logEvent('portefolje.endringslogg_stepper', {modal: props.modal});
                }}
            >
                {props.knappeTekst ? props.knappeTekst : 'Se hvordan'}
            </Knapp>
            <TourModal
                open={open}
                modalName={props.modal}
                onClose={() => setOpen(false)}
                systemtittel={props.systemtittel}
            />
        </>
    );
}
