import {FetchMockHandler} from '../index';
import {delayed, errorResponse, jsonResponse} from '../utils';
import getSessionData, {DEFAULT_SESSION_LIFETIME_IN_SECONDS, defaultSessionDataMockConfig} from '../data/session';
import FetchMock from 'yet-another-fetch-mock';
import {SessionMeta} from '../../middleware/api';

let sessionBaseTimestamp = Date.now();
let sessionDataMockConfig = defaultSessionDataMockConfig(sessionBaseTimestamp);
let sessionData: SessionMeta | null = null;

export const sesjonUtlopt = () => {
    return sessionData?.tokens?.expire_at && Date.now() >= new Date(sessionData?.tokens?.expire_at).getTime();
};

export const authHandlers: FetchMockHandler[] = [
    (fetchMock: FetchMock) =>
        fetchMock.get(
            '/oauth2/session',
            delayed(100, (req, res, ctx) => {
                sessionData = getSessionData(sessionDataMockConfig);
                return jsonResponse(sessionData)(req, res, ctx);
            })
        ),
    (fetchMock: FetchMock) =>
        fetchMock.get(
            '/oauth2/session/refresh',
            delayed(100, (req, res, ctx) => {
                if (sesjonUtlopt()) {
                    return errorResponse(401)(req, res, ctx);
                }

                sessionDataMockConfig = defaultSessionDataMockConfig(Date.now(), DEFAULT_SESSION_LIFETIME_IN_SECONDS);
                sessionData = getSessionData(sessionDataMockConfig);
                return jsonResponse(sessionData)(req, res, ctx);
            })
        ),
    (fetchMock: FetchMock) =>
        fetchMock.get(
            '/auth/info',
            jsonResponse({
                loggedIn: true,
                expirationTime: '2040-07-04T14:18:54.000Z',
                remainingSeconds: 60 * 60
            })
        )
];
