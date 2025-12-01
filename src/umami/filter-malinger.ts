import {formidlingsgruppe, servicegruppe} from '../filtrering/filter-konstanter';
import {Filtervalg} from '../typer/filtervalg-modell';
import {trackFilterValgEvent} from './umami-events';

export type FilterFields = {sideNavn: string; filter: string; verdi: string; veilederIdent: string};

export const filtermalinger = (fields: FilterFields) => {
    switch (fields.filter) {
        case Filtervalg.servicegruppe:
            trackFilterValgEvent({
                sidenavn: fields.sideNavn,
                filternavn: fields.filter,
                kategori: servicegruppe[fields.verdi]?.label
            });
            break;
        case Filtervalg.formidlingsgruppe:
            trackFilterValgEvent({
                sidenavn: fields.sideNavn,
                filternavn: fields.filter,
                kategori: formidlingsgruppe[fields.verdi]?.label
            });
            break;
        case Filtervalg.navnEllerFnrQuery:
        case Filtervalg.veiledere:
            break;
        default:
            trackFilterValgEvent({
                sidenavn: fields.sideNavn,
                filternavn: fields.filter,
                kategori: fields.verdi
            });
            break;
    }
};
