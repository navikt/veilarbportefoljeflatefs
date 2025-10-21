import {Kolonne} from '../../../ducks/ui/listevisning';
import {DataCellProps} from './DataCellProps';
import {DatoDataCellType} from '../dataCellTypes/DatoDataCellType';

export const VenterPaSvarFraBrukerData = ({bruker, valgteKolonner}: DataCellProps) => {
    const venterPaSvarFraBruker = bruker.venterPaSvarFraBruker ? new Date(bruker.venterPaSvarFraBruker) : null;

    return (
        <DatoDataCellType
            dato={venterPaSvarFraBruker}
            skalVises={valgteKolonner.includes(Kolonne.VENTER_SVAR_FRA_BRUKER_DATO)}
            className="col col-xs-2"
        />
    );
};
