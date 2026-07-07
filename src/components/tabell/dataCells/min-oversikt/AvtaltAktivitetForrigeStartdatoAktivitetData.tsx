import {Kolonne} from '../../../../ducks/ui/valgte-kolonner';
import {DataCellProps} from '../DataCellProps';
import {DatoDataCellType} from '../../dataCellTypes/DatoDataCellType';

export const AvtaltAktivitetForrigeStartdatoAktivitetData = ({bruker, valgteKolonner}: DataCellProps) => (
    <DatoDataCellType
        className="col col-xs-2"
        dato={
            bruker.aktiviteterAvtaltMedNav.forrigeAktivitetStart
                ? bruker.aktiviteterAvtaltMedNav.forrigeAktivitetStart
                : null
        }
        skalVises={valgteKolonner.includes(Kolonne.FORRIGE_START_DATO_AKTIVITET)}
    />
);
