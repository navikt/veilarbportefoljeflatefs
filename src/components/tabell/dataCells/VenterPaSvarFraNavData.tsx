import {Kolonne} from '../../../ducks/ui/listevisning';
import {DataCellProps} from './DataCellProps';
import {DatoDataCellType} from '../dataCellTypes/DatoDataCellType';

export const VenterPaSvarFraNavData = ({bruker, valgteKolonner}: DataCellProps) => {
    const venterPaSvarFraNAV = bruker.venterPaSvarFraNAV ? new Date(bruker.venterPaSvarFraNAV) : null;

    return (
        <DatoDataCellType
            dato={venterPaSvarFraNAV}
            skalVises={valgteKolonner.includes(Kolonne.VENTER_SVAR_FRA_NAV_DATO)}
            className="col col-xs-2"
        />
    );
};
