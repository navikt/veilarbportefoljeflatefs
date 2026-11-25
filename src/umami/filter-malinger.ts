import {Filtervalg} from '../typer/filtervalg-modell';
import {trackFilterValgEvent} from './umami-events';

export type FilterFields = {sideNavn: string; filter: string; verdi: string; veilederIdent: string};

export const filtermalinger = (fields: FilterFields) => {
    switch (fields.filter) {
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
