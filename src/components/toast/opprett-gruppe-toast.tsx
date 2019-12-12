import React, { useEffect, useRef } from 'react';
import './toast.less';
import AlertStripeSuksess from 'nav-frontend-alertstriper/lib/suksess-alertstripe';
import { useDispatch } from 'react-redux';
import { useTimer } from '../../hooks/use-timer';
import { fjernOpprettGruppeToast } from '../../store/toast/actions';

function OpprettGruppeToast() {
    const toastRef = useRef<HTMLDivElement>(null);
    const {startTimer} = useTimer();

    const dispatch = useDispatch();

    useEffect(() => {
        (toastRef.current as HTMLSpanElement).focus();
    }, [toastRef]);

    useEffect(() => {
        startTimer();
        const timer = setTimeout(() => {
            dispatch(fjernOpprettGruppeToast());
        }, 10000000);
        return () => clearTimeout(timer);
    });

    return (
        <div className="opprett-gruppe-toast" tabIndex={0} ref={toastRef}>
            <AlertStripeSuksess className="opprett-gruppe-toast__alertstripe">
                <span className="opprett-gruppe-toast__tekst">
                    Gruppen er opprettet
                </span>
            </AlertStripeSuksess>
        </div>
    );
}

export default OpprettGruppeToast;
