import {Kolonne} from '../../../../ducks/ui/listevisning';
import {InnholdscelleProps} from './../InnholdscelleProps';
import {DatoKolonne} from '../../kolonner/datokolonne';

export const HuskelappFrist = ({bruker, valgteKolonner}: InnholdscelleProps) => {
    const huskeLappFrist = bruker.huskelapp?.frist ? new Date(bruker.huskelapp.frist) : null;

    return (
        <DatoKolonne
            dato={huskeLappFrist}
            skalVises={valgteKolonner.includes(Kolonne.HUSKELAPP_FRIST)}
            className="col col-xs-2"
        />
    );
};
