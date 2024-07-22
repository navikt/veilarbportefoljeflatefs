import {SessionMeta} from '../../middleware/api';

type SessionDataMockConfig = {
    createdAt: string;
    tokensExpireTimestamp: number;
    sessionExpireTimestamp: number;
    tokensRefreshBufferPeriodMs: number;
    tokensRefreshedAt?: string;
};

export const DEFAULT_SESSION_LIFETIME_IN_SECONDS = 10 * 60; // 10 minutes

export const sessionData = ({
    createdAt,
    tokensExpireTimestamp,
    sessionExpireTimestamp,
    tokensRefreshBufferPeriodMs,
    tokensRefreshedAt
}: SessionDataMockConfig): SessionMeta => {
    const nowTimestamp: number = Date.now();

    return {
        session: {
            created_at: createdAt,
            ends_at: new Date(Math.floor(sessionExpireTimestamp)).toISOString(),
            ends_in_seconds:
                nowTimestamp >= sessionExpireTimestamp ? 0 : Math.floor((sessionExpireTimestamp - nowTimestamp) / 1000)
        },
        tokens: {
            refreshed_at: tokensRefreshedAt || createdAt,
            expire_at: new Date(Math.floor(tokensExpireTimestamp)).toISOString(),
            expire_in_seconds:
                nowTimestamp >= tokensExpireTimestamp ? 0 : Math.floor((tokensExpireTimestamp - nowTimestamp) / 1000),
            next_auto_refresh_in_seconds:
                nowTimestamp >= tokensExpireTimestamp - tokensRefreshBufferPeriodMs
                    ? 0
                    : Math.floor((tokensExpireTimestamp - tokensRefreshBufferPeriodMs - nowTimestamp) / 1000),
            refresh_cooldown: false,
            refresh_cooldown_seconds: 0
        }
    };
};

export const defaultSessionDataMockConfig = (
    baseTimestamp: number,
    extendSessionWithSeconds?: number
): SessionDataMockConfig => {
    const timeLeftInSessionSeconds = extendSessionWithSeconds
        ? extendSessionWithSeconds
        : DEFAULT_SESSION_LIFETIME_IN_SECONDS;
    const timeLeftInTokensSeconds = timeLeftInSessionSeconds;
    const sessionLifetimeSeconds = 10 * 60 * 60;
    const tokensLifetimeSeconds = 60 * 60;

    return {
        createdAt: new Date(
            baseTimestamp + timeLeftInSessionSeconds * 1000 - sessionLifetimeSeconds * 1000
        ).toISOString(),
        tokensExpireTimestamp: baseTimestamp + timeLeftInTokensSeconds * 1000,
        sessionExpireTimestamp: baseTimestamp + timeLeftInSessionSeconds * 1000,
        tokensRefreshBufferPeriodMs: 5 * 60 * 1000,
        tokensRefreshedAt: new Date(
            baseTimestamp + timeLeftInTokensSeconds * 1000 - tokensLifetimeSeconds * 1000
        ).toISOString()
    };
};

export default sessionData;
