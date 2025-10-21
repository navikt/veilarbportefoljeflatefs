import {Kolonne} from '../../../ducks/ui/listevisning';
import {DataCellProps} from './DataCellProps';
import {DatoKolonne} from '../kolonner/datokolonne';

export const FilterhendelseDatoOpprettet = ({bruker, valgteKolonner}: DataCellProps) => (
    <DatoKolonne
        skalVises={valgteKolonner.includes(Kolonne.FILTERHENDELSE_DATO_OPPRETTET)}
        dato={bruker.utgattVarsel?.dato ? new Date(bruker.utgattVarsel?.dato) : null}
        className="col col-xs-2"
    />
);
