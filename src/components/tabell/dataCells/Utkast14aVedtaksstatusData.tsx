import {Kolonne} from '../../../ducks/ui/listevisning';
import {TekstDataCellType} from '../dataCellTypes/TekstDataCellType';
import {DataCellProps} from './DataCellProps';

export const Utkast14aVedtaksstatusData = ({bruker, valgteKolonner}: DataCellProps) => (
    <TekstDataCellType
        tekst={bruker.utkast14a?.status ?? '-'}
        skalVises={valgteKolonner.includes(Kolonne.VEDTAKSTATUS)}
        className="col col-xs-2"
    />
);
