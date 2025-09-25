import {InnholdscelleProps} from './InnholdscelleProps';
import {DatoKolonne} from '../kolonner/datokolonne';
import {tildelingsdato} from '../../../utils/dato-utils';
import {Kolonne} from '../../../ducks/ui/listevisning';

export const Tildelingsdato = ({bruker, valgteKolonner}: InnholdscelleProps) => (
    <DatoKolonne
        dato={tildelingsdato(bruker.tildelingsdato)}
        skalVises={valgteKolonner.includes(Kolonne.TILDELINGSDATO)}
        className="col col-xs-2"
    />
);
