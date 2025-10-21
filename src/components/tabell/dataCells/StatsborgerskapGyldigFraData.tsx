import {Kolonne} from '../../../ducks/ui/listevisning';
import {TekstKolonne} from '../dataCellTypes/tekstkolonne';
import {DataCellProps} from './DataCellProps';
import {toDateString} from '../../../utils/dato-utils';

export const StatsborgerskapGyldigFraData = ({bruker, valgteKolonner}: DataCellProps) => (
    <TekstKolonne
        tekst={bruker.hovedStatsborgerskap?.gyldigFra ? toDateString(bruker.hovedStatsborgerskap.gyldigFra) : '-'}
        skalVises={valgteKolonner.includes(Kolonne.STATSBORGERSKAP_GYLDIG_FRA)}
        className="col col-xs-2"
    />
);
