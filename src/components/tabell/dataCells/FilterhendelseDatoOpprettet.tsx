import {Kolonne} from '../../../ducks/ui/listevisning';
import {InnholdscelleProps} from './InnholdscelleProps';
import {DatoKolonne} from '../kolonner/datokolonne';

export const FilterhendelseDatoOpprettet = ({bruker, valgteKolonner}: InnholdscelleProps) => (
    <DatoKolonne
        skalVises={valgteKolonner.includes(Kolonne.FILTERHENDELSE_DATO_OPPRETTET)}
        dato={bruker.utgattVarsel?.dato ? new Date(bruker.utgattVarsel?.dato) : null}
        className="col col-xs-2"
    />
);
