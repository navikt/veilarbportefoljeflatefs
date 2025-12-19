import {Kolonne} from '../../../../ducks/ui/listevisning';
import {DataCellProps} from '../DataCellProps';
import {DatoDataCellType} from '../../dataCellTypes/DatoDataCellType';

export const AvtaltAktivitetStartdatoAktivitetData = ({bruker, valgteKolonner}: DataCellProps) => (
    <DatoDataCellType
        className="col col-xs-2"
        dato={
            bruker.aktiviteterAvtaltMedNav.aktivitetStart
                ? new Date(bruker.aktiviteterAvtaltMedNav.aktivitetStart)
                : null
        }
        skalVises={valgteKolonner.includes(Kolonne.START_DATO_AKTIVITET)}
    />
);
