import React, { useEffect, useRef } from 'react';
import './toast.less';
import AlertStripeSuksess from 'nav-frontend-alertstriper/lib/suksess-alertstripe';
import { useDispatch } from 'react-redux';
import { useTimer } from '../../hooks/use-timer';
import { fjernSletteGruppeToast } from '../../store/toast/actions';

function SletteGruppeToast() {
    const toastRef = useRef<HTMLSpanElement>(null);
    const {startTimer} = useTimer();

    const dispatch = useDispatch();

    useEffect(() => {
        (toastRef.current as HTMLSpanElement).focus();
    }, [toastRef]);

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(fjernSletteGruppeToast());
        }, 10000);
        return () => clearTimeout(timer);
    });

    useEffect(() => {
        startTimer();
    });

    return (
        <div className="slette-gruppe-toast" key={new Date().getTime()}>
            <AlertStripeSuksess className="slette-gruppe-toast__alertstripe">
                <span ref={toastRef} tabIndex={0} className="slette-gruppe-toast__tekst">
                    Gruppen er slettet
                </span>
            </AlertStripeSuksess>
        </div>
    );
}

export default SletteGruppeToast;
