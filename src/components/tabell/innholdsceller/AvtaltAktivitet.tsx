import {nesteUtlopsdatoEllerNull} from '../../../utils/utils';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {InnholdscelleProps} from './InnholdscelleProps';
import {DatoKolonne} from '../kolonner/datokolonne';

export const AvtaltAktivitet = ({bruker, valgteKolonner}: InnholdscelleProps) => (
    <DatoKolonne
        className="col col-xs-2"
        dato={nesteUtlopsdatoEllerNull(bruker.aktiviteter)}
        skalVises={valgteKolonner.includes(Kolonne.AVTALT_AKTIVITET)}
    />
);
