import {Kolonne} from '../../../ducks/ui/listevisning';
import {DataCellProps} from './DataCellProps';
import {TidDataCellType} from '../dataCellTypes/TidDataCellType';
import {klokkeslettTilMinutter} from '../../../utils/dato-utils';

export const MoterIDagData = ({bruker, valgteKolonner}: DataCellProps) => {
    const moteStartTid = klokkeslettTilMinutter(bruker.alleMoterStartTid);

    return (
        <TidDataCellType
            tidSomMinutter={moteStartTid}
            skalVises={valgteKolonner.includes(Kolonne.MOTER_IDAG)}
            className="col col-xs-2"
        />
    );
};
