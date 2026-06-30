import {DataCellProps} from './DataCellProps';
import {Kolonne} from '../../../ducks/ui/valgte-kolonner';
import {DatoDataCellType} from '../dataCellTypes/DatoDataCellType';

export const UngdomsprogramMaksdatoData = ({bruker, valgteKolonner}: DataCellProps) => {
    const maksdato = bruker.ytelser.ungdomsprogram?.maksdato ? new Date(bruker.ytelser.ungdomsprogram.maksdato) : null;

    return (
        <DatoDataCellType
            dato={maksdato}
            skalVises={valgteKolonner.includes(Kolonne.UNGDOMSPROGRAM_MAKSDATO)}
            className="col col-xs-2"
        />
    );
};
