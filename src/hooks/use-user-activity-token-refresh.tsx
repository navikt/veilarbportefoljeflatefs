import {useEffect, useState} from 'react';
import {hentSesjonMetadata, refreshAccessTokens, SessionMeta} from '../middleware/api';
import throttle from 'lodash.throttle';
import {isDefined} from '../utils/types/typeguards';

const FEM_MINUTTER_I_MILLISEKUNDER = 5 * 60 * 1000;
const TI_SEKUNDER_I_MILLISEKUNDER = 10000;

export const useUserActivityTokenRefresh = () => {
    const [tokenUtloperTimestampMs, setTokenUtloperTimestampMs] = useState<number | null>(null);
    const [refreshTillattTimestampMs, setRefreshTillattTimestampMs] = useState<number | null>(null);

    const oppdaterTokenStatus = (sessionMeta: SessionMeta): void => {
        const expireInSeconds = sessionMeta?.tokens?.expire_in_seconds;
        const refreshCooldownSeconds = sessionMeta?.tokens?.refresh_cooldown_seconds;
        const naaMs = Date.now();

        setTokenUtloperTimestampMs(isDefined(expireInSeconds) ? naaMs + expireInSeconds * 1000 : null);
        setRefreshTillattTimestampMs(isDefined(refreshCooldownSeconds) ? naaMs + refreshCooldownSeconds * 1000 : null);
    };

    useEffect(() => {
        hentSesjonMetadata().then(oppdaterTokenStatus);
    }, []);

    useEffect(() => {
        const brukeraktivitetEvents = ['mousedown', 'mousemove', 'keydown', 'scroll'];

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

        const handleBrukeraktivitetThrottled = throttle(handleBrukeraktivitet, TI_SEKUNDER_I_MILLISEKUNDER, {
            trailing: false
        });

        brukeraktivitetEvents.forEach(event => document.addEventListener(event, handleBrukeraktivitetThrottled));

        return () => {
            brukeraktivitetEvents.forEach(inputEvent =>
                document.removeEventListener(inputEvent, handleBrukeraktivitetThrottled)
            );
        };
    }, [refreshTillattTimestampMs, tokenUtloperTimestampMs]);
};
