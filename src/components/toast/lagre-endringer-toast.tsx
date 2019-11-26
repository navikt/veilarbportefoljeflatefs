import React, { useEffect, useRef } from 'react';
import './toast.less';
import AlertStripeSuksess from 'nav-frontend-alertstriper/lib/suksess-alertstripe';
import { useDispatch } from 'react-redux';
import { useTimer } from '../../hooks/use-timer';
import { fjernLagreEndringerToast } from '../../store/toast/actions';

export interface ToastType {
    className?: string;
}

function LagreEndringerToast(props: ToastType) {
    const toastRef = useRef<HTMLSpanElement>(null);
    const {startTimer} = useTimer();

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(fjernLagreEndringerToast());
    };

    useEffect(() => {
        (toastRef.current as HTMLSpanElement).focus();
    }, [toastRef]);

    useEffect(() => {
        const timer = setTimeout(() => {
            handleClick();
        }, 10000);
        return () => clearTimeout(timer);
    });

    useEffect(() => {
        startTimer();
    });

    return (
        <div className="lagre-endringer-toast" key={new Date().getTime()}>
            <AlertStripeSuksess className="lagre-endringer-toast__alertstripe">
                <span ref={toastRef} tabIndex={0} className="lagre-endringer-toast__tekst">
                    Gruppen er lagret
                    <button onClick={handleClick}
                            className="lagre-endringer-toast__lukknapp lukknapp lukknapp--svart">&times;</button>
                </span>
            </AlertStripeSuksess>
        </div>
    );
}

export default LagreEndringerToast;
