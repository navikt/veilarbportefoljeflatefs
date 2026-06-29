import {Kolonne} from '../../../ducks/ui/valgte-kolonner';
import {DataCellProps} from './DataCellProps';
import {formaterVarighetSomTimerOgMinutt} from '../../../utils/dato-utils';
import {TekstDataCellType} from '../dataCellTypes/TekstDataCellType';

export const MoteIDagVarighetData = ({bruker, valgteKolonner}: DataCellProps) => {
    const motevarighet = bruker.moteMedNavIDag?.varighetMinutter
        ? formaterVarighetSomTimerOgMinutt(bruker.moteMedNavIDag.varighetMinutter)
        : '–';

    return (
        <TekstDataCellType
            tekst={motevarighet}
            skalVises={valgteKolonner.includes(Kolonne.MOTER_VARIGHET)}
            className="col col-xs-2"
        />
    );
};
