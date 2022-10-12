import {useEffect, useState} from 'react';
import {hentSesjonMetadata, refreshAccessTokens, SessionMeta} from '../middleware/api';
import {isDefined} from '../utils/types/typeguards';
import {useBrukeraktivitetLytter} from './use-brukeraktivitet-lytter';

const FEM_MINUTTER_I_MILLISEKUNDER = 5 * 60 * 1000;

export const useBrukeraktivitetTokenRefresh = (onUtlopt: () => void, onOppdatert: () => void) => {
    const [tokenUtloperTimestampMs, setTokenUtloperTimestampMs] = useState<number | null>(null);
    const [refreshTillattTimestampMs, setRefreshTillattTimestampMs] = useState<number | null>(null);
    const [sesjonUtlopt, setSesjonUtlopt] = useState<boolean | null>(null);

    const oppdaterSesjonStatus = (sessionMeta: SessionMeta): void => {
        const tokensExpireInSeconds = sessionMeta?.tokens?.expire_in_seconds;
        const tokensRefreshCooldownSeconds = sessionMeta?.tokens?.refresh_cooldown_seconds;
        const sessionEndsInSeconds = sessionMeta?.session?.ends_in_seconds;
        const naaMs = Date.now();

        setTokenUtloperTimestampMs(isDefined(tokensExpireInSeconds) ? naaMs + tokensExpireInSeconds * 1000 : null);
        setRefreshTillattTimestampMs(
            isDefined(tokensRefreshCooldownSeconds) ? naaMs + tokensRefreshCooldownSeconds * 1000 : null
        );
        setSesjonUtlopt(isDefined(sessionEndsInSeconds) ? sessionEndsInSeconds <= 0 : null);
    };

    const handleBrukeraktivitet = (): void => {
        if (!isDefined(tokenUtloperTimestampMs) || !isDefined(refreshTillattTimestampMs)) {
            return;
        }

        const naaMs = Date.now();
        const tokenUtloperSnart = naaMs + FEM_MINUTTER_I_MILLISEKUNDER >= tokenUtloperTimestampMs;
        const refreshTillatt = naaMs >= refreshTillattTimestampMs;

        if (tokenUtloperSnart && refreshTillatt && !sesjonUtlopt) {
            refreshAccessTokens()
                .then((sesjon: SessionMeta) => {
                    oppdaterSesjonStatus(sesjon);
                    onOppdatert();
                })
                .catch(() => {
                    setSesjonUtlopt(true);
                    onUtlopt();
                });
        }
    };

    useEffect(() => {
        hentSesjonMetadata().then(oppdaterSesjonStatus);
    }, []);

    useBrukeraktivitetLytter(document, handleBrukeraktivitet);
};
