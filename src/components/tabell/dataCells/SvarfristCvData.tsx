import {Kolonne} from '../../../ducks/ui/valgte-kolonner';
import {TekstDataCellType} from '../dataCellTypes/TekstDataCellType';
import {DataCellProps} from './DataCellProps';
import {fomraterTilNorskDateString} from '../../../utils/dato-utils';

export const SvarfristCvData = ({bruker, valgteKolonner}: DataCellProps) => {
    const formatertDato = fomraterTilNorskDateString(bruker.nesteSvarfristCvStillingFraNav);

    return (
        <TekstDataCellType
            tekst={formatertDato ? formatertDato : '-'}
            skalVises={valgteKolonner.includes(Kolonne.CV_SVARFRIST)}
            className="col col-xs-2"
        />
    );
};
