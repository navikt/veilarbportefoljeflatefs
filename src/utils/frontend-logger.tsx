import {erMock} from './url-utils';
import {FilterFields, filtermalinger} from '../umami/filter-malinger';

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
    // Nokre tilfeller av logEvent vert ikkje sendt vidare til Umami enno, dette gjeld endring i sortering og valgte kolonner, og vert trigga av endringar i Redux-state.
};
