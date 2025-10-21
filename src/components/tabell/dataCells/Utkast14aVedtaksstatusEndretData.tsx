import {Kolonne} from '../../../ducks/ui/listevisning';
import {DataCellProps} from './DataCellProps';
import {dagerSiden} from '../../../utils/dato-utils';
import {DagerSidenDataCellType} from '../dataCellTypes/DagerSidenDataCellType';

export const Utkast14aVedtaksstatusEndretData = ({bruker, valgteKolonner}: DataCellProps) => (
    <DagerSidenDataCellType
        dato={dagerSiden(bruker.utkast14a?.statusEndret)}
        skalVises={valgteKolonner.includes(Kolonne.VEDTAKSTATUS_ENDRET)}
        className="col col-xs-2"
    />
);
