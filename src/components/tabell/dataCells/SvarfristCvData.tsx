import {Kolonne} from '../../../ducks/ui/valgte-kolonner';
import {TekstDataCellType} from '../dataCellTypes/TekstDataCellType';
import {DataCellProps} from './DataCellProps';
import {formaterDato} from '../../../utils/dato-utils';

export const SvarfristCvData = ({bruker, valgteKolonner}: DataCellProps) => {
    const formatertDato = formaterDato(bruker.nesteSvarfristCvStillingFraNav);

    return (
        <TekstDataCellType
            tekst={formatertDato ? formatertDato : '-'}
            skalVises={valgteKolonner.includes(Kolonne.CV_SVARFRIST)}
            className="col col-xs-2"
        />
    );
};
