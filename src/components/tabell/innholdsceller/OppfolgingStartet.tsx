import {Kolonne} from '../../../ducks/ui/listevisning';
import {InnholdscelleProps} from './InnholdscelleProps';
import {oppfolgingStartetDato} from '../../../utils/dato-utils';
import {DatoKolonne} from '../kolonner/datokolonne';

export const OppfolgingStartet = ({bruker, valgteKolonner}: InnholdscelleProps) => (
    <DatoKolonne
        className="col col-xs-2"
        skalVises={valgteKolonner.includes(Kolonne.OPPFOLGING_STARTET)}
        dato={oppfolgingStartetDato(bruker.oppfolgingStartdato)}
    />
);
