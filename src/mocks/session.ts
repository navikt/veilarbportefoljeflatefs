import {SessionMeta} from '../middleware/api';

const sessionData = (isRefresh: boolean = false) => {
    const outdatedAccessToken = isRefresh ? false : Math.random() < 5;
    const tenHoursInSeconds: number = 10 * 60 * 60;
    const oneHourInSeconds: number = 60 * 60;
    const fiveMinutesInSeconds: number = 5 * 60;
    const now: Date = new Date();
    const nowIsoString: string = now.toISOString();
    const nowPlusTenHoursIsoString: string = new Date(now.getTime() + tenHoursInSeconds * 1000).toISOString();
    const nowPlusOneHourIsoString: string = new Date(now.getTime() + oneHourInSeconds * 1000).toISOString();
    const nowMinusOneHourIsoString: string = new Date(now.getTime() - oneHourInSeconds * 1000).toISOString();

    return {
        session: {
            created_at: nowIsoString,
            ends_at: nowPlusTenHoursIsoString,
            ends_in_seconds: tenHoursInSeconds
        },
        tokens: {
            refreshed_at: outdatedAccessToken ? nowMinusOneHourIsoString : nowIsoString,
            expire_at: outdatedAccessToken ? nowIsoString : nowPlusOneHourIsoString,
            expire_in_seconds: outdatedAccessToken ? 0 : oneHourInSeconds,
            next_auto_refresh_in_seconds: outdatedAccessToken ? 0 : oneHourInSeconds - fiveMinutesInSeconds,
            refresh_cooldown: false,
            refresh_cooldown_seconds: 0
        }
    } as SessionMeta;
};

export default sessionData;
