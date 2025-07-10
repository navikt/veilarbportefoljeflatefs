import {Kolonne} from '../../../ducks/ui/listevisning';
import {InnholdscelleProps} from './InnholdscelleProps';
import {DatoKolonne} from '../kolonner/datokolonne';

export const TiltakshendelseDatoOpprettet = ({bruker, valgteKolonner}: InnholdscelleProps) => (
    <DatoKolonne
        dato={bruker.tiltakshendelse ? new Date(bruker.tiltakshendelse.opprettet) : null}
        skalVises={valgteKolonner.includes(Kolonne.TILTAKSHENDELSE_DATO_OPPRETTET)}
        className="col col-xs-2"
    />
);
