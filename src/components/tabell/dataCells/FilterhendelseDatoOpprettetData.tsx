import {Kolonne} from '../../../ducks/ui/listevisning';
import {DataCellProps} from './DataCellProps';
import {DatoKolonne} from '../kolonner/datokolonne';

export const FilterhendelseDatoOpprettetData = ({bruker, valgteKolonner}: DataCellProps) => (
    <DatoKolonne
        skalVises={valgteKolonner.includes(Kolonne.FILTERHENDELSE_DATO_OPPRETTET)}
        dato={bruker.utgattVarsel?.dato ? new Date(bruker.utgattVarsel?.dato) : null}
        className="col col-xs-2"
    />
);
