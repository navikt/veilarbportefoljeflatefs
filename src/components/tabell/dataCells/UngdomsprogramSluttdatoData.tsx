import {DataCellProps} from './DataCellProps';
import {Kolonne} from '../../../ducks/ui/valgte-kolonner';
import {DatoDataCellType} from '../dataCellTypes/DatoDataCellType';

export const UngdomsprogramSluttdatoData = ({bruker, valgteKolonner}: DataCellProps) => {
    const sluttdato = bruker.ytelser.ungdomsprogram?.sluttdato
        ? new Date(bruker.ytelser.ungdomsprogram.sluttdato)
        : null;

    return (
        <DatoDataCellType
            dato={sluttdato}
            skalVises={valgteKolonner.includes(Kolonne.UNGDOMSPROGRAM_SLUTTDATO)}
            className="col col-xs-2"
        />
    );
};
