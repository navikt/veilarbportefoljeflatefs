import {default as React, useEffect, useState} from 'react';
import {Knapp} from 'nav-frontend-knapper';
import {logEvent} from '../../../utils/frontend-logger';
import '../tour-modal/tour-modal.less';
import classNames from 'classnames';
import SanityTourModal, {ModalName} from './sanity_tour-modal';
import {getClient} from '../../../lib/sanity';
import {EndringsloggData, query} from '../../endringslogg/sanity/endringslogg-groq';
import {StepperData} from './sanity_tour-modal-groq';

interface ModalStepperProps {
    modalName: ModalName;
    knappeTekst?: string;
    className?: string;
    systemtittel?: string;
    stepper: StepperData[];
    endringsloggmelding: EndringsloggData[];
}

export default function SanityTourModalButton(props: ModalStepperProps) {
    const [open, setOpen] = useState(false);
    const [post, setPost] = useState<Array<any>>([]);

    useEffect(() => {
        getClient(false)
            .fetch(query)
            .then(blogpost => {
                setPost(blogpost);
            });
    }, []);

    const modalName = () => {
        return props.stepper.filter(stepper => stepper.tittel === 'Test');
    };

    console.log('stepper', modalName());

    return (
        <>
            <Knapp
                className={classNames('endringslogg-stepperKnapp sanity', props.className)}
                mini
                data-testid="endringslogg_se-hvordan-knapp"
                onClick={() => {
                    setOpen(true);
                    logEvent('portefolje.endringslogg_stepper', {modal: props.modalName});
                }}
            >
                {props.knappeTekst ? props.knappeTekst : 'Se hvordan'}
            </Knapp>
            <SanityTourModal
                open={open}
                modalName={ModalName.MINE_FILTER}
                onClose={() => setOpen(false)}
                stepper={post}
            />
        </>
    );
}
