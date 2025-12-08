import {Kolonne} from '../../../ducks/ui/listevisning';
import {DataCellProps} from './DataCellProps';
import {TekstDataCellType} from '../dataCellTypes/TekstDataCellType';

export const Utkast14aVedtaksstatusEndretData = ({bruker, valgteKolonner}: DataCellProps) => (
    <TekstDataCellType
        tekst={bruker.vedtak14a.utkast14a.dagerSidenStatusEndretSeg ?? '-'}
        skalVises={valgteKolonner.includes(Kolonne.VEDTAKSTATUS_ENDRET)}
        className="col col-xs-2"
    />
);
