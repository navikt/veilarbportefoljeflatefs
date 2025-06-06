import {Kolonne} from '../../../ducks/ui/listevisning';
import {InnholdscelleProps} from './InnholdscelleProps';
import {TidKolonne} from '../kolonner/tidkolonne';
import {klokkeslettTilMinutter} from '../../../utils/dato-utils';

export const MoterIDag = ({bruker, valgteKolonner}: InnholdscelleProps) => {
    const moteStartTid = klokkeslettTilMinutter(bruker.alleMoterStartTid);

    return (
        <TidKolonne
            className="col col-xs-2"
            dato={moteStartTid}
            skalVises={valgteKolonner.includes(Kolonne.MOTER_IDAG)}
        />
    );
};
