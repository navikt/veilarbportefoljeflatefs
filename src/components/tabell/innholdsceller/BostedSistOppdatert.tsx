import {Kolonne} from '../../../ducks/ui/listevisning';
import {TekstKolonne} from '../kolonner/tekstkolonne';
import {InnholdscelleProps} from './InnholdscelleProps';
import {toDateString} from '../../../utils/dato-utils';

export const BostedSistOppdatert = ({bruker, valgteKolonner}: InnholdscelleProps) => (
    <TekstKolonne
        className="col col-xs-2"
        skalVises={valgteKolonner.includes(Kolonne.BOSTED_SIST_OPPDATERT)}
        tekst={bruker.bostedSistOppdatert ? toDateString(bruker.bostedSistOppdatert) : '-'}
    />
);
