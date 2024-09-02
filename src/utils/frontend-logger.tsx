import {erMock} from './url-utils';
// import {sendEventTilPortefolje} from '../middleware/api';

export interface FrontendEvent {
    name: string;
    fields?: {};
    tags?: {};
}

export const logEvent = (logTag: string, fields?: {}, tags?: {}): void => {
    if (erMock()) {
        // eslint-disable-next-line no-console
        console.log('Event', logTag, 'Fields:', fields, 'Tags:', tags);
    } else {
        // Funker ikke etter vi flytta til GCP på grunn av influx som bare er i fss?
        // sendEventTilPortefolje({name: logTag, fields: fields, tags: tags});
    }
};
