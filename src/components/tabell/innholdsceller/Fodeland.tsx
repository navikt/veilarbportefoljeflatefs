import {capitalize} from '../../../utils/utils';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {TekstKolonne} from '../kolonner/tekstkolonne';
import {InnholdscelleProps} from './InnholdscelleProps';

export const Fodeland = ({bruker, valgteKolonner}: InnholdscelleProps) => (
    <TekstKolonne
        tekst={bruker.foedeland ? capitalize(bruker.foedeland) : '-'}
        skalVises={valgteKolonner.includes(Kolonne.FODELAND)}
        className="col col-xs-2"
    />
);
