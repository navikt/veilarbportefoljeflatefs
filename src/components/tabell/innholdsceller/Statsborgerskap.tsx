import {capitalize} from '../../../utils/utils';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {TekstKolonne} from '../kolonner/tekstkolonne';
import {InnholdscelleProps} from './InnholdscelleProps';

export const Statsborgerskap = ({bruker, valgteKolonner}: InnholdscelleProps) => (
    <TekstKolonne
        tekst={
            bruker.hovedStatsborgerskap?.statsborgerskap ? capitalize(bruker.hovedStatsborgerskap.statsborgerskap) : '-'
        }
        skalVises={valgteKolonner.includes(Kolonne.STATSBORGERSKAP)}
        className="col col-xs-2"
    />
);
