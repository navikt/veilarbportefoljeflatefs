import {nesteUtlopsdatoEllerNull} from '../../../utils/utils';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {DataCellProps} from './DataCellProps';
import {DatoDataCellType} from '../dataCellTypes/DatoDataCellType';

export const AvtaltAktivitetData = ({bruker, valgteKolonner}: DataCellProps) => (
    <DatoDataCellType
        dato={nesteUtlopsdatoEllerNull(bruker.aktiviteter)}
        skalVises={valgteKolonner.includes(Kolonne.AVTALT_AKTIVITET)}
        className="col col-xs-2"
    />
);
