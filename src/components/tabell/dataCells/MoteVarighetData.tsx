import {Kolonne} from '../../../ducks/ui/listevisning';
import {DataCellProps} from './DataCellProps';
import {VarighetDataCellType} from '../dataCellTypes/VarighetDataCellType';
import {minuttDifferanse} from '../../../utils/dato-utils';

export const MoteVarighetData = ({bruker, valgteKolonner}: DataCellProps) => {
    const motevarighet = minuttDifferanse(bruker.alleMoterSluttTid, bruker.alleMoterStartTid);

    return (
        <VarighetDataCellType
            varighetMinutter={motevarighet}
            skalVises={valgteKolonner.includes(Kolonne.MOTER_VARIGHET)}
            className="col col-xs-2"
        />
    );
};
