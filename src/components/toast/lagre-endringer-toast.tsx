import React, { useEffect, useRef } from 'react';
import './toast.less';
import AlertStripeSuksess from 'nav-frontend-alertstriper/lib/suksess-alertstripe';
import { useDispatch } from 'react-redux';
import { useTimer } from '../../hooks/use-timer';
import { fjernLagreEndringerToast } from '../../store/toast/actions';

function LagreEndringerToast() {
    const toastRef = useRef<HTMLDivElement>(null);
    const {startTimer} = useTimer();

    const dispatch = useDispatch();

    useEffect(() => {
        (toastRef.current as HTMLSpanElement).focus();
    }, [toastRef]);

    useEffect(() => {
        startTimer();
        const timer = setTimeout(() => {
            dispatch(fjernLagreEndringerToast());
        }, 10000);
        return () => clearTimeout(timer);
    });

    return (
        <div className="lagre-endringer-toast" ref={toastRef} tabIndex={0}>
            <AlertStripeSuksess className="lagre-endringer-toast__alertstripe">
                <span className="lagre-endringer-toast__tekst">
                    Gruppen er lagret
                </span>
            </AlertStripeSuksess>
        </div>
    );
}

export default LagreEndringerToast;
