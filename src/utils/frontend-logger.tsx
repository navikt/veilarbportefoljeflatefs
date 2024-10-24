import {erMock} from './url-utils';
import {trackAmplitude} from '../amplitude/amplitude';
import {innsatsgruppe, hovedmal, formidlingsgruppe, servicegruppe} from '../filtrering/filter-konstanter';

export type FilterFields = {sideNavn: string; filter: string; verdi: string; veilederIdent: string};

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
    } else {
        if (isFilterFields(fields)) {
            // eslint-disable-next-line no-console
            console.log('Amplitude data ', fields.filter, fields.verdi);
            switch (fields.filter) {
                case 'hovedmal':
                    trackAmplitude({
                        name: 'filtervalg',
                        data: {
                            filternavn: fields.filter,
                            kategori: hovedmal[fields.verdi]?.label
                        }
                    });
                    break;
                case 'servicegruppe':
                    trackAmplitude({
                        name: 'filtervalg',
                        data: {
                            filternavn: fields.filter,
                            kategori: servicegruppe[fields.verdi]?.label
                        }
                    });
                    break;
                case 'formidlingsgruppe':
                    trackAmplitude({
                        name: 'filtervalg',
                        data: {
                            filternavn: fields.filter,
                            kategori: formidlingsgruppe[fields.verdi]?.label
                        }
                    });
                    break;
                case 'innsatsgruppe':
                    trackAmplitude({
                        name: 'filtervalg',
                        data: {
                            filternavn: fields.filter,
                            kategori: innsatsgruppe[fields.verdi]?.label
                        }
                    });
                    break;
                default:
                    break;
            }
            if (fields?.filter === 'innsatsgruppe') {
                // eslint-disable-next-line no-console
                console.log('Amplitude data ', fields.filter, fields.verdi);
                trackAmplitude({
                    name: 'filtervalg',
                    data: {
                        filternavn: fields?.filter,
                        kategori: innsatsgruppe[fields.verdi]?.label
                    }
                });
            }
        }

        // Funker ikke etter vi flytta til GCP på grunn av influx som bare er i fss?
        // sendEventTilPortefolje({name: logTag, fields: fields, tags: tags});
    }
};
