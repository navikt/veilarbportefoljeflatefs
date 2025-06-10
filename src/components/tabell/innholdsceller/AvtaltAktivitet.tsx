import {nesteUtlopsdatoEllerNull} from '../../../utils/utils';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {InnholdscelleProps} from './InnholdscelleProps';
import {DatoKolonne} from '../kolonner/datokolonne';

export const AvtaltAktivitet = ({bruker, valgteKolonner}: InnholdscelleProps) => (
    <DatoKolonne
        dato={nesteUtlopsdatoEllerNull(bruker.aktiviteter)}
        skalVises={valgteKolonner.includes(Kolonne.AVTALT_AKTIVITET)}
        className="col col-xs-2"
    />
);
