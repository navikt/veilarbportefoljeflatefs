import {InnholdscelleProps} from '../InnholdscelleProps';
import {DatoKolonne} from '../../kolonner/datokolonne';
import {Kolonne} from '../../../../ducks/ui/listevisning';

export const HuskelappSistEndret = ({bruker, valgteKolonner}: InnholdscelleProps) => {
    const huskelappSistEndret = bruker.huskelapp?.endretDato ? new Date(bruker.huskelapp.endretDato) : null;

    return (
        <DatoKolonne
            dato={huskelappSistEndret}
            skalVises={valgteKolonner.includes(Kolonne.HUSKELAPP_SIST_ENDRET)}
            className="col col-xs-2"
        />
    );
};
