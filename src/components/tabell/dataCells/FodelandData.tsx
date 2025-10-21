import {capitalize} from '../../../utils/utils';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {TekstKolonne} from '../kolonner/tekstkolonne';
import {DataCellProps} from './DataCellProps';

export const FodelandData = ({bruker, valgteKolonner}: DataCellProps) => (
    <TekstKolonne
        tekst={bruker.foedeland ? capitalize(bruker.foedeland) : '-'}
        skalVises={valgteKolonner.includes(Kolonne.FODELAND)}
        className="col col-xs-2"
    />
);
