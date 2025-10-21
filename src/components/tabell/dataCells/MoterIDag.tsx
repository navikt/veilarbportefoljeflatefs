import {Kolonne} from '../../../ducks/ui/listevisning';
import {DataCellProps} from './DataCellProps';
import {TidKolonne} from '../kolonner/tidkolonne';
import {klokkeslettTilMinutter} from '../../../utils/dato-utils';

export const MoterIDag = ({bruker, valgteKolonner}: DataCellProps) => {
    const moteStartTid = klokkeslettTilMinutter(bruker.alleMoterStartTid);

    return (
        <TidKolonne
            dato={moteStartTid}
            skalVises={valgteKolonner.includes(Kolonne.MOTER_IDAG)}
            className="col col-xs-2"
        />
    );
};
