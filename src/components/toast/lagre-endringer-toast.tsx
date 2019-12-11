import React, { useEffect, useRef } from 'react';
import './toast.less';
import AlertStripeSuksess from 'nav-frontend-alertstriper/lib/suksess-alertstripe';
import { useDispatch } from 'react-redux';
import { useTimer } from '../../hooks/use-timer';
import { fjernLagreEndringerToast } from '../../store/toast/actions';

function LagreEndringerToast() {
    const toastRef = useRef<HTMLSpanElement>(null);
    const {startTimer} = useTimer();

    const dispatch = useDispatch();

    useEffect(() => {
        (toastRef.current as HTMLSpanElement).focus();
    }, [toastRef]);

    useEffect(() => {
        startTimer();
        const timer = setTimeout(() => {
            dispatch(fjernLagreEndringerToast());
        }, 5000);
        return () => clearTimeout(timer);
    });

    return (
        <div className="lagre-endringer-toast">
            <AlertStripeSuksess className="lagre-endringer-toast__alertstripe">
                <span ref={toastRef} tabIndex={0} className="lagre-endringer-toast__tekst">
                    Gruppen er lagret
                </span>
            </AlertStripeSuksess>
        </div>
    );
}

export default LagreEndringerToast;
