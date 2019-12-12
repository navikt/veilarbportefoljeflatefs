import React, { useEffect, useRef } from 'react';
import './toast.less';
import { useDispatch } from 'react-redux';
import { useTimer } from '../../hooks/use-timer';
import { fjernIngenEndringerToast } from '../../store/toast/actions';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';

function IngenEndringerToast() {
    const toastRef = useRef<HTMLDivElement>(null);
    const {startTimer} = useTimer();

    const dispatch = useDispatch();

    useEffect(() => {
        (toastRef.current as HTMLSpanElement).focus();
    }, [toastRef]);

    useEffect(() => {
        startTimer();
        const timer = setTimeout(() => {
            dispatch(fjernIngenEndringerToast());
        }, 10000);
        return () => clearTimeout(timer);
    });

    return (
        <div className="ingen-endringer-toast" ref={toastRef} tabIndex={0}>
            <AlertStripeInfo className="ingen-endringer-toast__alertstripe">
                <span  className="ingen-endringer-toast__tekst">
                    Du har ikke gjort noen endringer
                </span>
            </AlertStripeInfo>
        </div>
    );
}

export default IngenEndringerToast;
