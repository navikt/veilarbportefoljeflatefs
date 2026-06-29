import {Kolonne} from '../../../ducks/ui/valgte-kolonner';
import {TekstDataCellType} from '../dataCellTypes/TekstDataCellType';
import {DataCellProps} from './DataCellProps';
import {toDateString} from '../../../utils/dato-utils';

export const StatsborgerskapGyldigFraData = ({bruker, valgteKolonner}: DataCellProps) => (
    <TekstDataCellType
        tekst={bruker.hovedStatsborgerskap?.gyldigFra ? toDateString(bruker.hovedStatsborgerskap.gyldigFra) : '-'}
        skalVises={valgteKolonner.includes(Kolonne.STATSBORGERSKAP_GYLDIG_FRA)}
        className="col col-xs-2"
    />
);
