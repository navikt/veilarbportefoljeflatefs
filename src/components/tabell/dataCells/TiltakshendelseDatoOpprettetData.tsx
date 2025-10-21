import {Kolonne} from '../../../ducks/ui/listevisning';
import {DataCellProps} from './DataCellProps';
import {DatoDataCellType} from '../dataCellTypes/DatoDataCellType';

export const TiltakshendelseDatoOpprettetData = ({bruker, valgteKolonner}: DataCellProps) => (
    <DatoDataCellType
        dato={bruker.tiltakshendelse ? new Date(bruker.tiltakshendelse.opprettet) : null}
        skalVises={valgteKolonner.includes(Kolonne.TILTAKSHENDELSE_DATO_OPPRETTET)}
        className="col col-xs-2"
    />
);
