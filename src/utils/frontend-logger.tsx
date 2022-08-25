import {erMock} from './url-utils';

export interface FrontendEvent {
    name: string;
    fields?: {};
    tags?: {};
}

export const logEvent = (logTag: string, fields?: {}, tags?: {}): void => {
    if (erMock()) {
        console.log('Event', logTag, 'Fields:', fields, 'Tags:', tags);
    } else {
        // TODO: legg tilbake etter prodhendelsen er over
        //sendEventTilPortefolje({name: logTag, fields: fields, tags: tags});
    }
};
