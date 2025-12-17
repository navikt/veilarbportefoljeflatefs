import {Kolonne} from '../../../ducks/ui/listevisning';
import {DataCellProps} from './DataCellProps';
import {KlokkeslettDataCellType} from '../dataCellTypes/KlokkeslettDataCellType';

export const ForstkommendeMoteData = ({bruker, valgteKolonner}: DataCellProps) => {
    return (
        <KlokkeslettDataCellType
            dato={bruker.moterMedNav.forstkommendeMoteDato}
            skalVises={valgteKolonner.includes(Kolonne.MOTER_IDAG)}
            className="col col-xs-2"
        />
    );
};
