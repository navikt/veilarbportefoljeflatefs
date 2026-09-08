import {Kolonne} from '../../../../ducks/ui/valgte-kolonner';
import {DataCellProps} from '../DataCellProps';
import {DatoDataCellType} from '../../dataCellTypes/DatoDataCellType';

export const AvtaltAktivitetNesteStartdatoAktivitetData = ({bruker, valgteKolonner}: DataCellProps) => (
    <DatoDataCellType
        className="col col-xs-2"
        dato={
            bruker.aktiviteterAvtaltMedNav.nesteAktivitetStart
                ? bruker.aktiviteterAvtaltMedNav.nesteAktivitetStart
                : null
        }
        skalVises={valgteKolonner.includes(Kolonne.NESTE_START_DATO_AKTIVITET)}
    />
);
