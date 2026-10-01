import {DataCellProps} from './DataCellProps';
import {TekstDataCellType} from '../dataCellTypes/TekstDataCellType';
import {Kolonne} from '../../../ducks/ui/valgte-kolonner';

export const UforetrygdUforegradData = ({bruker, valgteKolonner}: DataCellProps) => (
    <TekstDataCellType
        tekst={bruker.ytelser.uforetrygd?.uforegrad ?? '-'}
        skalVises={valgteKolonner.includes(Kolonne.UFORETRYGD_UFOREGRAD)}
        className="col col-xs-2"
    />
);
