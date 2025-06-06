import {Kolonne} from '../../../ducks/ui/listevisning';
import {InnholdscelleProps} from './InnholdscelleProps';
import {VarighetKolonne} from '../kolonner/varighetkolonne';
import {minuttDifferanse} from '../../../utils/dato-utils';

export const MoteVarighet = ({bruker, valgteKolonner}: InnholdscelleProps) => {
    const motevarighet = minuttDifferanse(bruker.alleMoterSluttTid, bruker.alleMoterStartTid);

    return (
        <VarighetKolonne
            className="col col-xs-2"
            dato={motevarighet}
            skalVises={valgteKolonner.includes(Kolonne.MOTER_VARIGHET)}
        />
    );
};
