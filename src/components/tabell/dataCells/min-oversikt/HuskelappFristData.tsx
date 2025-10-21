import {Kolonne} from '../../../../ducks/ui/listevisning';
import {DataCellProps} from '../DataCellProps';
import {DatoKolonne} from '../../dataCellTypes/datokolonne';

export const HuskelappFristData = ({bruker, valgteKolonner}: DataCellProps) => {
    const huskeLappFrist = bruker.huskelapp?.frist ? new Date(bruker.huskelapp.frist) : null;

    return (
        <DatoKolonne
            dato={huskeLappFrist}
            skalVises={valgteKolonner.includes(Kolonne.HUSKELAPP_FRIST)}
            className="col col-xs-2"
        />
    );
};
