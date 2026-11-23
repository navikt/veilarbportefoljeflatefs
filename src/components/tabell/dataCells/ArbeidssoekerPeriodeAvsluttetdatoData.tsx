import {DataCellProps} from './DataCellProps';
import {Kolonne} from '../../../ducks/ui/valgte-kolonner';
import {DatoDataCellType} from '../dataCellTypes/DatoDataCellType';

export const ArbeidssoekerPeriodeAvsluttetdatoData = ({bruker, valgteKolonner}: DataCellProps) => (
    <DatoDataCellType
        dato={bruker.arbeidssoekerregisteret?.arbeidssoekerPeriodeAvsluttetdato ?? null}
        skalVises={valgteKolonner.includes(Kolonne.HAR_IKKE_AKTIV_PERIODE_I_ARBEIDSSOEKERREGISTERET)}
        className="col col-xs-2"
    />
);
