import {Kolonne} from '../../../ducks/ui/listevisning';
import {DataCellProps} from './DataCellProps';
import {DatoKolonne} from '../dataCellTypes/datokolonne';

export const VenterPaSvarFraBrukerData = ({bruker, valgteKolonner}: DataCellProps) => {
    const venterPaSvarFraBruker = bruker.venterPaSvarFraBruker ? new Date(bruker.venterPaSvarFraBruker) : null;

    return (
        <DatoKolonne
            dato={venterPaSvarFraBruker}
            skalVises={valgteKolonner.includes(Kolonne.VENTER_SVAR_FRA_BRUKER_DATO)}
            className="col col-xs-2"
        />
    );
};
