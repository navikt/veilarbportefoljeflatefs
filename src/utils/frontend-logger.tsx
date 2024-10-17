import {erMock} from './url-utils';
import {trackAmplitude} from '../amplitude/amplitude';
import {string} from 'prop-types';
import {filter} from 'cypress/types/minimatch';

// import {sendEventTilPortefolje} from '../middleware/api';

export interface FrontendEvent {
    name: string;
    fields?: {};
    tags?: {};
}

export const logEvent = (logTag: string, fields?: {}, tags?: {}): void => {
    let filter,
        verdi = '';
    if (fields) {
        const keys = Object.keys(fields);
        filter = fields[keys[1]];
        verdi = fields[keys[2]];
    }
    if (erMock()) {
        // eslint-disable-next-line no-console
        console.log('Event', logTag, 'Fields:', fields, 'Tags:', tags);
    } else {
        if (filter === 'innsatsgruppe') {
            // eslint-disable-next-line no-console
            console.log('Amplitude data ', filter, verdi);
            trackAmplitude({name: 'filtervalg', data: {filter, verdi}});
        }
        // Funker ikke etter vi flytta til GCP på grunn av influx som bare er i fss?
        // sendEventTilPortefolje({name: logTag, fields: fields, tags: tags});
    }
};
