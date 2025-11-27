import {DataCellProps} from './DataCellProps';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {TekstDataCellType} from '../dataCellTypes/TekstDataCellType';

export const AapKelvinRettighetData = ({bruker, valgteKolonner}: DataCellProps) => {
    return (
        <TekstDataCellType
            tekst={bruker.ytelser.aap?.rettighetstype ?? '-'}
            skalVises={valgteKolonner.includes(Kolonne.AAP_KELVIN_RETTIGHET)}
            className="col col-xs-2"
        />
    );
};
