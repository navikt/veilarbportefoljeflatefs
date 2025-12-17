import {Kolonne} from '../../../ducks/ui/listevisning';
import {DataCellProps} from './DataCellProps';
import {formaterVarighetSomTimerOgMinutt} from '../../../utils/dato-utils';
import {TekstDataCellType} from '../dataCellTypes/TekstDataCellType';

export const MoteVarighetData = ({bruker, valgteKolonner}: DataCellProps) => {
    const motevarighet = bruker.moterMedNav.forstkommendeMoteVarighetMinutter
        ? formaterVarighetSomTimerOgMinutt(bruker.moterMedNav.forstkommendeMoteVarighetMinutter)
        : '–';

    return (
        <TekstDataCellType
            tekst={motevarighet}
            skalVises={valgteKolonner.includes(Kolonne.MOTER_VARIGHET)}
            className="col col-xs-2"
        />
    );
};
