import {DataCellProps} from './DataCellProps';
import {TekstDataCellType} from '../dataCellTypes/TekstDataCellType';
import {Kolonne} from '../../../ducks/ui/listevisning';

export const DagpengerRettighetData = ({bruker, valgteKolonner}: DataCellProps) => (
    <TekstDataCellType
        tekst={bruker.ytelser.dagpenger?.rettighetstype ?? '-'}
        skalVises={valgteKolonner.includes(Kolonne.DAGPENGER_RETTIGHETSTYPE)}
        className="col col-xs-2"
    />
);
