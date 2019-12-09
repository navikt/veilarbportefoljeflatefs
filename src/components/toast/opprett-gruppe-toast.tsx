import React, { useEffect, useRef } from 'react';
import './toast.less';
import AlertStripeSuksess from 'nav-frontend-alertstriper/lib/suksess-alertstripe';
import { useDispatch } from 'react-redux';
import { useTimer } from '../../hooks/use-timer';
import { fjernOpprettGruppeToast } from '../../store/toast/actions';
import { logEvent } from '../../utils/frontend-logger';
import { FiltervalgModell } from '../../model-interfaces';

export interface ToastType {
    className?: string;
    filterValg?: FiltervalgModell;
}

function OpprettGruppeToast(props: ToastType) {
    const toastRef = useRef<HTMLSpanElement>(null);
    const {startTimer} = useTimer();

    const dispatch = useDispatch();

    useEffect(() => {
        (toastRef.current as HTMLSpanElement).focus();
    }, [toastRef]);

    useEffect(() => {
        const timer = setTimeout(() => {
            logEvent('portefolje.metrikker.veiledergrupper.opprett-toast', {
                veiledere: props.filterValg && props.filterValg.veiledere.length});
            dispatch(fjernOpprettGruppeToast());
        }, 10000);
        return () => clearTimeout(timer);
    });

    useEffect(() => {
        startTimer();
    });

    return (
        <div className="opprett-gruppe-toast" key={new Date().getTime()}>
            <AlertStripeSuksess className="opprett-gruppe-toast__alertstripe">
                <span ref={toastRef} tabIndex={0} className="opprett-gruppe-toast__tekst">
                    Gruppen er opprettet
                </span>
            </AlertStripeSuksess>
        </div>
    );
}

export default OpprettGruppeToast;
