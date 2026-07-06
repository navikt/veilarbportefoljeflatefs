import {Kolonne} from '../../../ducks/ui/valgte-kolonner';
import {TekstDataCellType} from '../dataCellTypes/TekstDataCellType';
import {DataCellProps} from './DataCellProps';
import {fomraterTilNorskDateString} from '../../../utils/dato-utils';

export const StatsborgerskapGyldigFraData = ({bruker, valgteKolonner}: DataCellProps) => {
    const formatertDato = fomraterTilNorskDateString(bruker.hovedStatsborgerskap?.gyldigFra);

    return (
        <TekstDataCellType
            tekst={formatertDato ? formatertDato : '-'}
            skalVises={valgteKolonner.includes(Kolonne.STATSBORGERSKAP_GYLDIG_FRA)}
            className="col col-xs-2"
        />
    );
};
