import {Kolonne} from '../../../ducks/ui/listevisning';
import {TekstKolonne} from '../kolonner/tekstkolonne';
import {InnholdscelleProps} from './InnholdscelleProps';
import {toDateString} from '../../../utils/dato-utils';

export const GeografiskBostedSistOppdatert = ({bruker, valgteKolonner}: InnholdscelleProps) => (
    <TekstKolonne
        tekst={bruker.bostedSistOppdatert ? toDateString(bruker.bostedSistOppdatert) : '-'}
        skalVises={valgteKolonner.includes(Kolonne.BOSTED_SIST_OPPDATERT)}
        className="col col-xs-2"
    />
);
