import {erMock} from './url-utils';
import {sendEventTilPortefolje} from '../middleware/api';

export interface FrontendEvent {
    name: string;
    fields?: {};
    tags?: {};
}

export const logEvent = (logTag: string, fields?: {}, tags?: {}): void => {
    if (erMock()) {
        console.log('Event', logTag, 'Fields:', fields, 'Tags:', tags);
    } else {
        sendEventTilPortefolje({name: logTag, fields: fields, tags: tags});
    }
};
