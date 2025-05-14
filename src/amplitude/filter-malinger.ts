import {trackAmplitude} from './amplitude';
import {formidlingsgruppe, hovedmal, innsatsgruppe, servicegruppe} from '../filtrering/filter-konstanter';

export type FilterFields = {sideNavn: string; filter: string; verdi: string; veilederIdent: string};

export const filtermalinger = (fields: FilterFields) => {
    switch (fields.filter) {
        case 'hovedmal':
            trackAmplitude({
                name: 'filtervalg',
                data: {
                    sidenavn: fields.sideNavn,
                    filternavn: fields.filter,
                    kategori: hovedmal[fields.verdi]?.label
                }
            });
            break;
        case 'servicegruppe':
            trackAmplitude({
                name: 'filtervalg',
                data: {
                    sidenavn: fields.sideNavn,
                    filternavn: fields.filter,
                    kategori: servicegruppe[fields.verdi]?.label
                }
            });
            break;
        case 'formidlingsgruppe':
            trackAmplitude({
                name: 'filtervalg',
                data: {
                    sidenavn: fields.sideNavn,
                    filternavn: fields.filter,
                    kategori: formidlingsgruppe[fields.verdi]?.label
                }
            });
            break;
        case 'innsatsgruppe':
            trackAmplitude({
                name: 'filtervalg',
                data: {
                    sidenavn: fields.sideNavn,
                    filternavn: fields.filter,
                    kategori: innsatsgruppe[fields.verdi]?.label
                }
            });
            break;
        case 'navnEllerFnrQuery':
        case 'veiledere':
            break;
        default:
            trackAmplitude({
                name: 'filtervalg',
                data: {
                    sidenavn: fields.sideNavn,
                    filternavn: fields.filter,
                    kategori: fields.verdi
                }
            });
            break;
    }
};
