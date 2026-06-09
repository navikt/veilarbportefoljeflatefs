import {DataCellProps} from './DataCellProps';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {DatoDataCellType} from '../dataCellTypes/DatoDataCellType';

export const UngdomsprogramStartdatoData = ({bruker, valgteKolonner}: DataCellProps) => {
    const startdato = bruker.ytelser.ungdomsprogram?.startdato
        ? new Date(bruker.ytelser.ungdomsprogram.startdato)
        : null;

    return (
        <DatoDataCellType
            dato={startdato}
            skalVises={valgteKolonner.includes(Kolonne.UNGDOMSPROGRAM_STARTDATO)}
            className="col col-xs-2"
        />
    );
};
