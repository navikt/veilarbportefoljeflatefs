import {formidlingsgruppe, servicegruppe} from '../filtrering/filter-konstanter';
import {Filtervalg} from '../typer/filtervalg-modell';
import {trackFilterValgEvent} from '../umami/umami';

export type FilterFields = {sideNavn: string; filter: string; verdi: string; veilederIdent: string};

export const filtermalinger = (fields: FilterFields) => {
    switch (fields.filter) {
        case Filtervalg.servicegruppe:
            trackFilterValgEvent(fields.sideNavn, fields.filter, servicegruppe[fields.verdi]?.label);
            break;
        case Filtervalg.formidlingsgruppe:
            trackFilterValgEvent(fields.sideNavn, fields.filter, formidlingsgruppe[fields.verdi]?.label);
            break;
        case Filtervalg.navnEllerFnrQuery:
        case Filtervalg.veiledere:
            break;
        default:
            trackFilterValgEvent(fields.sideNavn, fields.filter, fields.verdi);
            break;
    }
};
