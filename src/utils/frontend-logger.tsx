import {loggEvent} from '../middleware/api';

export interface FrontendEvent {
    name: string;
    fields?: {};
    tags?: {};
}

export const logEvent = (logTag: string, fields?: {}, tags?: {}): void => {
    if (process.env.REACT_APP_MOCK === 'true') {
        console.log('Event', logTag, 'Fields:', fields, 'Tags:', tags);
    } else {
        loggEvent({name: logTag, fields: fields, tags: tags});
    }
};
