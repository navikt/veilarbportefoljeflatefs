import { default as React, useState } from 'react';
import { default as TourModal, ModalName } from './tour-modal';
import { Knapp } from 'nav-frontend-knapper';
import { logEvent } from '../../../utils/frontend-logger';
import './tour-modal.less';
import classNames from 'classnames';

interface ModalStepperProps {
    modal: ModalName;
    metrikknavn: string;
    knappeTekst?: string;
    className?: string;
}

export default function TourModalButton(props: ModalStepperProps) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Knapp className={classNames("endringslogg-stepperKnapp", props.className)} mini={true} onClick={() => {
                setOpen(true);
                logEvent(props.metrikknavn);
            }}>
                {props.knappeTekst ? props.knappeTekst : 'Se hvordan'}
            </Knapp>
            <TourModal
                open={open}
                modalName={props.modal}
                onClose={() => setOpen(false)}
            />
        </>
    );
}
