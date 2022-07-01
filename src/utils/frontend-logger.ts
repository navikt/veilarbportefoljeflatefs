import {
    createFrontendLogger,
    createMockFrontendLogger,
    DEFAULT_FRONTENDLOGGER_API_URL
} from '@navikt/frontendlogger/lib';

export const logger = process.env.REACT_APP_MOCK
    ? createMockFrontendLogger('veilarbportefoljeflatefs')
    : createFrontendLogger('veilarbportefoljeflatefs', DEFAULT_FRONTENDLOGGER_API_URL);

export const logEvent = (logTag: string, fields?: {}, tags?: {}): void => {
    console.log('Er mock: ' + process.env.REACT_APP_MOCK);
    logger.event(logTag, fields ? fields : {}, tags ? tags : {});
};
