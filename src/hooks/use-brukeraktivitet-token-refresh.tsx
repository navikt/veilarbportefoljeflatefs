import {useEffect, useState} from 'react';
import {hentSesjonMetadata, refreshAccessTokens, SessionMeta} from '../middleware/api';
import {isDefined} from '../utils/types/typeguards';
import {useBrukeraktivitetLytter} from './use-brukeraktivitet-lytter';

const FEM_MINUTTER_I_MILLISEKUNDER = 5 * 60 * 1000;

export const useBrukeraktivitetTokenRefresh = () => {
    const [tokenUtloperTimestampMs, setTokenUtloperTimestampMs] = useState<number | null>(null);
    const [refreshTillattTimestampMs, setRefreshTillattTimestampMs] = useState<number | null>(null);

    const oppdaterTokenStatus = (sessionMeta: SessionMeta): void => {
        const expireInSeconds = sessionMeta?.tokens?.expire_in_seconds;
        const refreshCooldownSeconds = sessionMeta?.tokens?.refresh_cooldown_seconds;
        const naaMs = Date.now();

        setTokenUtloperTimestampMs(isDefined(expireInSeconds) ? naaMs + expireInSeconds * 1000 : null);
        setRefreshTillattTimestampMs(isDefined(refreshCooldownSeconds) ? naaMs + refreshCooldownSeconds * 1000 : null);
    };

    const handleBrukeraktivitet = (): void => {
        if (!isDefined(tokenUtloperTimestampMs) || !isDefined(refreshTillattTimestampMs)) {
            return;
        }

        const naaMs = Date.now();
        const tokenUtloperSnart = naaMs + FEM_MINUTTER_I_MILLISEKUNDER >= tokenUtloperTimestampMs;
        const refreshTillatt = naaMs >= refreshTillattTimestampMs;

        if (tokenUtloperSnart && refreshTillatt) {
            refreshAccessTokens().then(oppdaterTokenStatus);
        }
    };

    useEffect(() => {
        hentSesjonMetadata().then(oppdaterTokenStatus);
    }, []);

    useBrukeraktivitetLytter(document, handleBrukeraktivitet);
};
