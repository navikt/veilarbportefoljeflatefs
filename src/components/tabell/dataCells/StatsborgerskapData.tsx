import {capitalize} from '../../../utils/utils';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {TekstDataCellType} from '../dataCellTypes/TekstDataCellType';
import {DataCellProps} from './DataCellProps';

export const StatsborgerskapData = ({bruker, valgteKolonner}: DataCellProps) => (
    <TekstDataCellType
        tekst={
            bruker.hovedStatsborgerskap?.statsborgerskap ? capitalize(bruker.hovedStatsborgerskap.statsborgerskap) : '-'
        }
        skalVises={valgteKolonner.includes(Kolonne.STATSBORGERSKAP)}
        className="col col-xs-2"
    />
);
