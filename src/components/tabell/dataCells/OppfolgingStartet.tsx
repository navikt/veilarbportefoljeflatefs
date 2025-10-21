import {Kolonne} from '../../../ducks/ui/listevisning';
import {InnholdscelleProps} from './InnholdscelleProps';
import {oppfolgingStartetDato} from '../../../utils/dato-utils';
import {DatoKolonne} from '../kolonner/datokolonne';

export const OppfolgingStartet = ({bruker, valgteKolonner}: InnholdscelleProps) => (
    <DatoKolonne
        dato={oppfolgingStartetDato(bruker.oppfolgingStartdato)}
        skalVises={valgteKolonner.includes(Kolonne.OPPFOLGING_STARTET)}
        className="col col-xs-2"
    />
);
