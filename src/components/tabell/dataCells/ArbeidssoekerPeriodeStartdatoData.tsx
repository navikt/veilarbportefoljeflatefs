import {DataCellProps} from './DataCellProps';
import {Kolonne} from '../../../ducks/ui/valgte-kolonner';
import {DatoDataCellType} from '../dataCellTypes/DatoDataCellType';

export const ArbeidssoekerPeriodeStartdatoData = ({bruker, valgteKolonner}: DataCellProps) => (
    <DatoDataCellType
        dato={bruker.arbeidssoekerregisteret?.arbeidssoekerPeriodeStartdato ?? null}
        skalVises={valgteKolonner.includes(Kolonne.HAR_AKTIV_PERIODE_I_ARBEIDSSOEKERREGISTERET)}
        className="col col-xs-2"
    />
);
