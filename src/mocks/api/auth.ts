import {delay, http, HttpResponse, RequestHandler} from 'msw';
import {DEFAULT_SESSION_LIFETIME_IN_SECONDS, defaultSessionDataMockConfig} from '../data/session';
import {SessionMeta} from '../../middleware/api';
import getSessionData from '../data/session';

let sessionBaseTimestamp = Date.now();
let sessionDataMockConfig = defaultSessionDataMockConfig(sessionBaseTimestamp);
let sessionData: SessionMeta | null = null;

export const sesjonUtlopt = () => {
    return sessionData?.tokens?.expire_at && Date.now() >= new Date(sessionData?.tokens?.expire_at).getTime();
};

export const withAuth = (resolver: any) => {
    return (input: any) => {
        if (sesjonUtlopt()) {
            return HttpResponse.json(null, {status: 401});
        }

        return resolver(input);
    };
};

export const authHandlers: RequestHandler[] = [
    http.get(
        '/oauth2/session',
        withAuth(async () => {
            await delay(100);

            return HttpResponse.json(getSessionData(sessionDataMockConfig));
        })
    ),
    http.get(
        '/oauth2/session/refresh',
        withAuth(async () => {
            await delay(100);

            sessionDataMockConfig = defaultSessionDataMockConfig(Date.now(), DEFAULT_SESSION_LIFETIME_IN_SECONDS);
            sessionData = getSessionData(sessionDataMockConfig);
            return HttpResponse.json(sessionData);
        })
    ),
    http.get(
        '/auth/info',
        withAuth(async () => {
            return HttpResponse.json({
                loggedIn: true,
                expirationTime: '2040-07-04T14:18:54.000Z',
                remainingSeconds: 60 * 60
            });
        })
    )
];
