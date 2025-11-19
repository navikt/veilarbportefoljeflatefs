import {trackAmplitude} from './amplitude';
import {formidlingsgruppe, servicegruppe} from '../filtrering/filter-konstanter';
import {Filtervalg} from '../typer/filtervalg-modell';

export type FilterFields = {sideNavn: string; filter: string; verdi: string; veilederIdent: string};

export const filtermalinger = (fields: FilterFields) => {
    switch (fields.filter) {
        case Filtervalg.servicegruppe:
            trackAmplitude({
                name: 'filtervalg',
                data: {
                    sidenavn: fields.sideNavn,
                    filternavn: fields.filter,
                    kategori: servicegruppe[fields.verdi]?.label
                }
            });
            break;
        case Filtervalg.formidlingsgruppe:
            trackAmplitude({
                name: 'filtervalg',
                data: {
                    sidenavn: fields.sideNavn,
                    filternavn: fields.filter,
                    kategori: formidlingsgruppe[fields.verdi]?.label
                }
            });
            break;
        case Filtervalg.navnEllerFnrQuery:
        case Filtervalg.veiledere:
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
