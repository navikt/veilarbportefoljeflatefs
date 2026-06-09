import {DataCellProps} from './DataCellProps';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {TekstDataCellType} from '../dataCellTypes/TekstDataCellType';

export const UngdomsprogramRettighetData = ({bruker, valgteKolonner}: DataCellProps) => {
    return (
        <TekstDataCellType
            tekst={bruker.ytelser.ungdomsprogram?.rettighet ?? '-'}
            skalVises={valgteKolonner.includes(Kolonne.UNGDOMSPROGRAM_RETTIGHET)}
            className="col col-xs-2"
        />
    );
};
