import './sesjonNotifikasjon.css';

import {Alert, Link} from '@navikt/ds-react';
import React, {useEffect, useRef, useState} from 'react';

import {loginUrl} from '../../utils/url-utils';
import {hentResterendeSekunder} from '../../middleware/api';
import {erGCP} from '../../utils/utils';
import {logEvent} from '../../utils/frontend-logger';

enum SesjonStatus {
    UTLOPER_SNART,
    TVUNGEN_UTLOGGING_SNART
}

export const SesjonNotifikasjon = (): React.ReactElement | null => {
    const [sesjonStatus, setSesjonStatus] = useState<SesjonStatus>();
    const [utlopAlertOmMs, setUtlopAlertOmMs] = useState<number>();
    const [utloggingAlertOmMs, setUtloggingAlertOmMs] = useState<number>();
    const [tvungenUtloggingOmMs, setTvungenUtloggingOmMs] = useState<number>();
    const [expirationTimeMs, setExpirationTimeMs] = useState<number | undefined>(undefined);
    useEffect(() => {
        hentResterendeSekunder()
            .then(remainingSeconds => setExpirationTimeMs(remainingSeconds * 1000))
            .catch(e => {
                if (erGCP()) {
                    console.error(e);
                }
            });
    }, [setExpirationTimeMs]);

    const tvungenUtloggingTimeoutRef = useRef<number>();
    const tvungenUtloggingAlertTimeoutRef = useRef<number>();
    const utloperSnartAlertTimeoutRef = useRef<number>();

    const visTvungen = sesjonStatus === SesjonStatus.TVUNGEN_UTLOGGING_SNART;
    const visUtloper = sesjonStatus === SesjonStatus.UTLOPER_SNART;

    useEffect(() => {
        if (!expirationTimeMs) return;
        const fiveMin = 60 * 5 * 1000;
        const oneMin = 60 * 1000;
        const tenS = 10 * 1000;

        const msTilUtloperSnartAlert = expirationTimeMs - fiveMin;
        const msTilUtloggingAlert = expirationTimeMs - oneMin;
        const msTilUtlogging = expirationTimeMs - tenS;

        // TODO: Bytt ut med nais sin autorefresh når den er klar
        const refreshTokenWorkAround = expirationTimeMs - 60 * 30 * 1000;
        if (refreshTokenWorkAround < 0) {
            logEvent('portefolje.metrikker.autoRefresh');
            window.location.href = loginUrl();
        }

        setUtlopAlertOmMs(Math.max(msTilUtloperSnartAlert, 0));
        setUtloggingAlertOmMs(Math.max(msTilUtloggingAlert, 0));
        setTvungenUtloggingOmMs(Math.max(msTilUtlogging, 0));
    }, [expirationTimeMs]);

    useEffect(() => {
        if (utlopAlertOmMs === undefined) return;

        utloperSnartAlertTimeoutRef.current = setTimeout(() => {
            setSesjonStatus(SesjonStatus.UTLOPER_SNART);
        }, utlopAlertOmMs) as unknown as number;

        return () => clearTimeout(utloperSnartAlertTimeoutRef.current);
    }, [utlopAlertOmMs]);

    useEffect(() => {
        if (utloggingAlertOmMs === undefined) return;

        tvungenUtloggingAlertTimeoutRef.current = setTimeout(() => {
            setSesjonStatus(SesjonStatus.TVUNGEN_UTLOGGING_SNART);
        }, utloggingAlertOmMs) as unknown as number;

        return () => clearTimeout(tvungenUtloggingAlertTimeoutRef.current);
    }, [utloggingAlertOmMs]);

    useEffect(() => {
        if (sesjonStatus !== SesjonStatus.TVUNGEN_UTLOGGING_SNART) return;
        if (tvungenUtloggingTimeoutRef.current) return;
        if (!tvungenUtloggingOmMs) return;

        tvungenUtloggingTimeoutRef.current = setTimeout(() => {
            window.location.href = loginUrl();
        }, tvungenUtloggingOmMs) as unknown as number;

        return () => clearTimeout(tvungenUtloggingTimeoutRef.current);
    }, [sesjonStatus, tvungenUtloggingOmMs]);

    if (sesjonStatus === undefined) return null;

    const LoginLenke = () => (
        <Link href={loginUrl()} className="wonderwallLoginLenke">
            Forleng innloggingen
        </Link>
    );

    return (
        <div className="sesjonNotifikasjonWraper">
            {visTvungen && (
                <Alert variant="error" role="alert">
                    Du blir straks logget ut, og må forlenge innloggingen.
                    <LoginLenke />
                </Alert>
            )}
            {visUtloper && (
                <Alert variant="warning" role="alert">
                    Du blir snart logget ut. Forleng innloggingen for å unngå å miste pågående arbeid.
                    <LoginLenke />
                </Alert>
            )}
        </div>
    );
};
