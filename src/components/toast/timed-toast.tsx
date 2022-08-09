import React, {useEffect, useRef} from 'react';
import './toast.css';
import {useDispatch} from 'react-redux';
import {useTimer} from '../../hooks/use-timer';
import {kebabCase} from '../../utils/utils';
import {Alert, BodyShort} from '@navikt/ds-react';

interface TimedToastProps {
    toastTekst: string;
    alertstripe: any;
    fjernToast: any;
}

function TimedToast(props: TimedToastProps) {
    const toastRef = useRef<HTMLDivElement>(null);
    const {startTimer} = useTimer();

    const dispatch = useDispatch();

    useEffect(() => {
        (toastRef.current as HTMLSpanElement).focus();
    }, [toastRef]);

    useEffect(() => {
        startTimer();
        const timer = setTimeout(() => {
            dispatch(props.fjernToast);
        }, 6000);
        return () => clearTimeout(timer);
    });

    return (
        <div className="timed-toast" ref={toastRef} tabIndex={0}>
            <Alert
                variant={props.alertstripe}
                className="timed-toast__alertstripe"
                data-testid={`timed-toast_${kebabCase(props.toastTekst)}`}
                size="small"
            >
                <BodyShort size="small" className="timed-toast__tekst">
                    {props.toastTekst}
                </BodyShort>
            </Alert>
        </div>
    );
}

export default TimedToast;
