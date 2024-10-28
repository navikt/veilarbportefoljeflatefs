import {erMock} from './url-utils';
import {FilterFields, filtermalinger} from '../amplitude/filter-malinger';

type Fields = FilterFields | {} | undefined;

function isFilterFields(fields: Fields): fields is FilterFields {
    return (fields as FilterFields).filter !== undefined;
}

export interface FrontendEvent {
    name: string;
    fields?: {};
    tags?: {};
}

export const logEvent = (logTag: string, fields?: Fields, tags?: {}): void => {
    if (erMock()) {
        // eslint-disable-next-line no-console
        console.log('Event', logTag, 'Fields:', fields, 'Tags:', tags);
    } else if (isFilterFields(fields)) {
        filtermalinger(fields);
    }
    // Influxdb virker ikke i GCP. Målinger flyttes til Amplitude i stedet.
};
