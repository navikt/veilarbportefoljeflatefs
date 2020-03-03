import React, { useEffect, useRef } from 'react';
import './toast.less';
import { useDispatch } from 'react-redux';
import { useTimer } from '../../hooks/use-timer';
import AlertStripe from 'nav-frontend-alertstriper';

interface VeiledergruppeToastProps {
    toastTekst: string;
    alertstripe: any;
    fjernToast: any;
}

function VeiledergruppeToast(props: VeiledergruppeToastProps) {
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
        }, 10000);
        return () => clearTimeout(timer);
    });

    return (
        <div className="veiledergruppe-toast" ref={toastRef} tabIndex={0}>
            <AlertStripe type={props.alertstripe} className="veiledergruppe-toast__alertstripe">
                <span className="veiledergruppe-toast__tekst">
                    {props.toastTekst}
                </span>
            </AlertStripe>
        </div>
    );
}

export default VeiledergruppeToast;
