import {Kolonne} from '../../../ducks/ui/listevisning';
import {TekstKolonne} from '../kolonner/tekstkolonne';
import {InnholdscelleProps} from './InnholdscelleProps';
import {toDateString} from '../../../utils/dato-utils';

export const StatsborgerskapGyldigFra = ({bruker, valgteKolonner}: InnholdscelleProps) => (
    <TekstKolonne
        tekst={bruker.hovedStatsborgerskap?.gyldigFra ? toDateString(bruker.hovedStatsborgerskap.gyldigFra) : '-'}
        skalVises={valgteKolonner.includes(Kolonne.STATSBORGERSKAP_GYLDIG_FRA)}
        className="col col-xs-2"
    />
);
