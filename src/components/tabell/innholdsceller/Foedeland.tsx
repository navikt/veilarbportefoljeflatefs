import {capitalize} from '../../../utils/utils';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {TekstKolonne} from '../kolonner/tekstkolonne';
import {InnholdscelleProps} from './InnholdscelleProps';

export const Foedeland = ({bruker, valgteKolonner}: InnholdscelleProps) => (
    <TekstKolonne
        className="col col-xs-2"
        tekst={bruker.foedeland ? capitalize(bruker.foedeland) : '-'}
        skalVises={valgteKolonner.includes(Kolonne.FODELAND)}
    />
);
