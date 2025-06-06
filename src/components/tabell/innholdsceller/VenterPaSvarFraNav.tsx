import {Kolonne} from '../../../ducks/ui/listevisning';
import {InnholdscelleProps} from './InnholdscelleProps';
import {DatoKolonne} from '../kolonner/datokolonne';

export const VenterPaSvarFraNav = ({bruker, valgteKolonner}: InnholdscelleProps) => {
    const venterPaSvarFraNAV = bruker.venterPaSvarFraNAV ? new Date(bruker.venterPaSvarFraNAV) : null;

    return (
        <DatoKolonne
            className="col col-xs-2"
            dato={venterPaSvarFraNAV}
            skalVises={valgteKolonner.includes(Kolonne.VENTER_SVAR_FRA_NAV_DATO)}
        />
    );
};
