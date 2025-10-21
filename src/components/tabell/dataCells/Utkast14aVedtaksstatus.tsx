import {Kolonne} from '../../../ducks/ui/listevisning';
import {TekstKolonne} from '../kolonner/tekstkolonne';
import {DataCellProps} from './DataCellProps';

export const Utkast14aVedtaksstatus = ({bruker, valgteKolonner}: DataCellProps) => (
    <TekstKolonne
        tekst={bruker.utkast14a?.status ?? '-'}
        skalVises={valgteKolonner.includes(Kolonne.VEDTAKSTATUS)}
        className="col col-xs-2"
    />
);
