import {Kolonne} from '../../../ducks/ui/listevisning';
import {TekstDataCellType} from '../dataCellTypes/TekstDataCellType';
import {DataCellProps} from './DataCellProps';
import {avvik14aVedtakAvhengigeFilter} from '../../../filtrering/filter-konstanter';

export const Status14aVedtakData = ({bruker, valgteKolonner}: DataCellProps) => (
    <TekstDataCellType
        tekst={
            avvik14aVedtakAvhengigeFilter.hasOwnProperty(bruker.avvik14aVedtak)
                ? avvik14aVedtakAvhengigeFilter[bruker.avvik14aVedtak].label
                : '-'
        }
        skalVises={valgteKolonner.includes(Kolonne.AVVIK_14A_VEDTAK)}
        className="col col-xs-2"
    />
);
