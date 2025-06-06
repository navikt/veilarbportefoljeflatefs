import {Kolonne} from '../../../ducks/ui/listevisning';
import {InnholdscelleProps} from './InnholdscelleProps';
import {DatoKolonne} from '../kolonner/datokolonne';

export const UtlopteAktiviteter = ({bruker, valgteKolonner}: InnholdscelleProps) => {
    const nyesteUtlopteAktivitet = bruker.nyesteUtlopteAktivitet ? new Date(bruker.nyesteUtlopteAktivitet) : null;

    return (
        <DatoKolonne
            className="col col-xs-2"
            dato={nyesteUtlopteAktivitet}
            skalVises={valgteKolonner.includes(Kolonne.UTLOPTE_AKTIVITETER)}
        />
    );
};
