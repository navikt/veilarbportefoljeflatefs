import {Kolonne} from '../../../ducks/ui/valgte-kolonner';
import {DataCellProps} from './DataCellProps';
import {TekstDataCellType} from '../dataCellTypes/TekstDataCellType';

export const MoteIDagKlokkeslettData = ({bruker, valgteKolonner}: DataCellProps) => {
    const klokkeslett = bruker.moteMedNavIDag?.klokkeslett ? bruker.moteMedNavIDag.klokkeslett : '–';

    return (
        <TekstDataCellType
            tekst={klokkeslett}
            skalVises={valgteKolonner.includes(Kolonne.MOTER_IDAG)}
            className="col col-xs-2"
        />
    );
};
