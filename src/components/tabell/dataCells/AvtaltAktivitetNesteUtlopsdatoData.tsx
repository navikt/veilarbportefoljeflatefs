import {Kolonne} from '../../../ducks/ui/listevisning';
import {DataCellProps} from './DataCellProps';
import {DatoDataCellType} from '../dataCellTypes/DatoDataCellType';

export const AvtaltAktivitetNesteUtlopsdatoData = ({bruker, valgteKolonner}: DataCellProps) => (
    <DatoDataCellType
        dato={
            bruker.aktiviteterAvtaltMedNav.nesteUtlopsdatoForAlleAktiviteter
                ? new Date(bruker.aktiviteterAvtaltMedNav.nesteUtlopsdatoForAlleAktiviteter)
                : null
        }
        skalVises={valgteKolonner.includes(Kolonne.AVTALT_AKTIVITET)}
        className="col col-xs-2"
    />
);
