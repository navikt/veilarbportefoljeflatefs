import {ytelsestypetekst} from '../../../utils/utils';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {DataCellProps} from './DataCellProps';
import {TekstDataCellType} from '../dataCellTypes/TekstDataCellType';

export const AapArenaYtelsestypeData = ({bruker, valgteKolonner}: DataCellProps) => (
    <TekstDataCellType
        className="col col-xs-2"
        skalVises={valgteKolonner.includes(Kolonne.YTELSE_ARENA_YTELSESTYPE_AAP)}
        tekst={bruker.ytelser.ytelserArena.ytelse ? ytelsestypetekst(bruker.ytelser.ytelserArena.ytelse) : '–'}
    />
);
