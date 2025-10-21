import {Kolonne} from '../../../ducks/ui/listevisning';
import {DataCellProps} from './DataCellProps';
import {VarighetKolonne} from '../kolonner/varighetkolonne';
import {minuttDifferanse} from '../../../utils/dato-utils';

export const MoteVarighetData = ({bruker, valgteKolonner}: DataCellProps) => {
    const motevarighet = minuttDifferanse(bruker.alleMoterSluttTid, bruker.alleMoterStartTid);

    return (
        <VarighetKolonne
            varighetMinutter={motevarighet}
            skalVises={valgteKolonner.includes(Kolonne.MOTER_VARIGHET)}
            className="col col-xs-2"
        />
    );
};
