import {Kolonne} from '../../../ducks/ui/listevisning';
import {DataCellProps} from './DataCellProps';
import {DatoKolonne} from '../kolonner/datokolonne';

export const VenterPaSvarFraNav = ({bruker, valgteKolonner}: DataCellProps) => {
    const venterPaSvarFraNAV = bruker.venterPaSvarFraNAV ? new Date(bruker.venterPaSvarFraNAV) : null;

    return (
        <DatoKolonne
            dato={venterPaSvarFraNAV}
            skalVises={valgteKolonner.includes(Kolonne.VENTER_SVAR_FRA_NAV_DATO)}
            className="col col-xs-2"
        />
    );
};
