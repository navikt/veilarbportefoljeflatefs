import {nesteUtlopsdatoEllerNull} from '../../../utils/utils';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {DataCellProps} from './DataCellProps';
import {DatoKolonne} from '../dataCellTypes/datokolonne';

export const AvtaltAktivitetData = ({bruker, valgteKolonner}: DataCellProps) => (
    <DatoKolonne
        dato={nesteUtlopsdatoEllerNull(bruker.aktiviteter)}
        skalVises={valgteKolonner.includes(Kolonne.AVTALT_AKTIVITET)}
        className="col col-xs-2"
    />
);
