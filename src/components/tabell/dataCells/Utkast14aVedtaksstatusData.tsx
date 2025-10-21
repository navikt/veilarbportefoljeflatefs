import {Kolonne} from '../../../ducks/ui/listevisning';
import {TekstKolonne} from '../dataCellTypes/tekstkolonne';
import {DataCellProps} from './DataCellProps';

export const Utkast14aVedtaksstatusData = ({bruker, valgteKolonner}: DataCellProps) => (
    <TekstKolonne
        tekst={bruker.utkast14a?.status ?? '-'}
        skalVises={valgteKolonner.includes(Kolonne.VEDTAKSTATUS)}
        className="col col-xs-2"
    />
);
