import {Kolonne} from '../../../ducks/ui/listevisning';
import {DataCellProps} from './DataCellProps';
import {DatoKolonne} from '../kolonner/datokolonne';

export const TiltakshendelseDatoOpprettet = ({bruker, valgteKolonner}: DataCellProps) => (
    <DatoKolonne
        dato={bruker.tiltakshendelse ? new Date(bruker.tiltakshendelse.opprettet) : null}
        skalVises={valgteKolonner.includes(Kolonne.TILTAKSHENDELSE_DATO_OPPRETTET)}
        className="col col-xs-2"
    />
);
