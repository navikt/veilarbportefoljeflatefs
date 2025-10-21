import {ytelsestypetekst} from '../../../utils/utils';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {DataCellProps} from './DataCellProps';
import {TekstKolonne} from '../kolonner/tekstkolonne';

export const AapArenaYtelsestype = ({bruker, valgteKolonner}: DataCellProps) => (
    <TekstKolonne
        className="col col-xs-2"
        skalVises={valgteKolonner.includes(Kolonne.YTELSE_ARENA_YTELSESTYPE_AAP)}
        tekst={bruker.ytelse ? ytelsestypetekst(bruker.ytelse) : '–'}
    />
);
