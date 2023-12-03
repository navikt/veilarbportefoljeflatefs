import {delay, http, HttpResponse, RequestHandler} from 'msw';
import {DEFAULT_SESSION_LIFETIME_IN_SECONDS, defaultSessionDataMockConfig} from '../../mocks-old/data/session';
import {SessionMeta} from '../../middleware/api';
import getSessionData from '../../mocks-old/data/session';

let sessionBaseTimestamp = Date.now();
let sessionDataMockConfig = defaultSessionDataMockConfig(sessionBaseTimestamp);
let sessionData: SessionMeta | null = null;

export const sesjonUtlopt = () => {
    return sessionData?.tokens?.expire_at && Date.now() >= new Date(sessionData?.tokens?.expire_at).getTime();
};

export const authHandlers: RequestHandler[] = [
    http.get('/oauth2/session', async () => {
        await delay(100);

        return HttpResponse.json(getSessionData(sessionDataMockConfig));
    }),
    http.get('/oauth2/session/refresh', async () => {
        await delay(100);

        if (sesjonUtlopt()) {
            return new HttpResponse(null, {status: 401});
        }

        sessionDataMockConfig = defaultSessionDataMockConfig(Date.now(), DEFAULT_SESSION_LIFETIME_IN_SECONDS);
        sessionData = getSessionData(sessionDataMockConfig);
        return HttpResponse.json(sessionData);
    }),
    http.get('/auth/info', async () => {
        return HttpResponse.json({
            loggedIn: true,
            expirationTime: '2040-07-04T14:18:54.000Z',
            remainingSeconds: 60 * 60
        });
    })
];
