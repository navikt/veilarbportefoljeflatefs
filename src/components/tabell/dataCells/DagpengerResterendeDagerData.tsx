import {DataCellProps} from './DataCellProps';
import {TekstDataCellType} from '../dataCellTypes/TekstDataCellType';
import {Kolonne} from '../../../ducks/ui/listevisning';

export const DagpengerResterendeDagerData = ({bruker, valgteKolonner}: DataCellProps) => (
    <TekstDataCellType
        tekst={bruker.ytelser.dagpenger?.resterendeDager ?? '-'}
        skalVises={valgteKolonner.includes(Kolonne.DAGPENGER_ANTALL_RESTERENDE_DAGER)}
        className="col col-xs-2"
    />
);
