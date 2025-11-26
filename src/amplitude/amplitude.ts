import {init, track} from '@amplitude/analytics-browser';
import {erProd} from '../utils/url-utils';
import {AmplitudeEvent} from './taxonomy-events';

export function initAmplitude() {
    const projectId = erProd() ? '691963e61d2b11465aa96acfcaa8959b' : 'faf28eb5445abfe75c7ac28ae7a8d050';

    init(projectId, undefined, {
        serverUrl: 'https://amplitude.nav.no/collect',
        ingestionMetadata: {
            sourceName: window.location.origin
        },
        defaultTracking: false
    });
}

const maskereFodselsnummer = (data?: Record<string, unknown>) => {
    const maskertObjekt = JSON.stringify(data).replace(/\d{11}/g, (_, indexOfMatch, fullString) =>
        fullString.charAt(indexOfMatch - 1) === '"' ? '***********' : '"***********"'
    );

    try {
        return JSON.parse(maskertObjekt);
    } catch (e) {
        console.error('kunne ikke maskere data korrekt før sending til amplitude');
    }
    return {};
};

async function logAmplitudeEvent(
    eventName: string,
    eventData?: Record<string, unknown>,
    origin = 'veilarbportefoljeflatefs'
): Promise<void> {
    try {
        await track(eventName, {...eventData, app: origin});
    } catch (e) {
        return Promise.reject(`Unexpected Amplitude error: ${e}`);
    }
}

export const trackAmplitude = (event: AmplitudeEvent, ekstraData?: Record<string, unknown>): Promise<void> => {
    if (!event || event.constructor !== Object) {
        return Promise.reject(
            'Argument must be an object of type {eventName: string, eventData?: Record<string, unknown>}'
        );
    }

    const {name: eventName, data: eventData = {}} = event;
    if (!eventName || typeof eventName !== 'string') {
        return Promise.reject('Parameter "eventName" must be a string');
    }
    if (!eventData || eventData.constructor !== Object) {
        return Promise.reject('Parameter "eventData" must be a plain object');
    }
    if (!!ekstraData && ekstraData?.constructor !== Object) {
        return Promise.reject('Parameter "ekstraData" must be a plain object');
    }

    return logAmplitudeEvent(eventName, maskereFodselsnummer({...eventData, ...ekstraData}));
};
