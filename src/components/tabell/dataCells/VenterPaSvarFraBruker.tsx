import {Kolonne} from '../../../ducks/ui/listevisning';
import {InnholdscelleProps} from './InnholdscelleProps';
import {DatoKolonne} from '../kolonner/datokolonne';

export const VenterPaSvarFraBruker = ({bruker, valgteKolonner}: InnholdscelleProps) => {
    const venterPaSvarFraBruker = bruker.venterPaSvarFraBruker ? new Date(bruker.venterPaSvarFraBruker) : null;

    return (
        <DatoKolonne
            dato={venterPaSvarFraBruker}
            skalVises={valgteKolonner.includes(Kolonne.VENTER_SVAR_FRA_BRUKER_DATO)}
            className="col col-xs-2"
        />
    );
};
