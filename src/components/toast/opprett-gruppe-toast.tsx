import React, { useEffect, useRef } from 'react';
import './toast.less';
import AlertStripeSuksess from 'nav-frontend-alertstriper/lib/suksess-alertstripe';
import { useDispatch } from 'react-redux';
import { useTimer } from '../../hooks/use-timer';
import { fjernOpprettGruppeToast } from '../../store/toast/actions';

function OpprettGruppeToast() {
    const toastRef = useRef<HTMLSpanElement>(null);
    const {startTimer} = useTimer();

    const dispatch = useDispatch();

    useEffect(() => {
        (toastRef.current as HTMLSpanElement).focus();
    }, [toastRef]);

    useEffect(() => {
        startTimer();
        const timer = setTimeout(() => {
            dispatch(fjernOpprettGruppeToast());
        }, 5000);
        return () => clearTimeout(timer);
    });

    return (
        <div className="opprett-gruppe-toast">
            <AlertStripeSuksess className="opprett-gruppe-toast__alertstripe">
                <span ref={toastRef} tabIndex={0} className="opprett-gruppe-toast__tekst">
                    Gruppen er opprettet
                </span>
            </AlertStripeSuksess>
        </div>
    );
}

export default OpprettGruppeToast;
