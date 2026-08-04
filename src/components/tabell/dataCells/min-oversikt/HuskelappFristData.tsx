import {Kolonne} from '../../../../ducks/ui/valgte-kolonner';
import {DataCellProps} from '../DataCellProps';
import {DatoDataCellType} from '../../dataCellTypes/DatoDataCellType';

export const HuskelappFristData = ({bruker, valgteKolonner}: DataCellProps) => {
    const huskeLappFrist = bruker.huskelapp?.frist ? bruker.huskelapp.frist : null;

    return (
        <DatoDataCellType
            dato={huskeLappFrist}
            skalVises={valgteKolonner.includes(Kolonne.HUSKELAPP_FRIST)}
            className="col col-xs-2"
        />
    );
};
