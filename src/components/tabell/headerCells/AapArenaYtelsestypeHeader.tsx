import {HeaderCellProps} from './HeaderCellProps';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {SorteringHeader} from '../sortering-header';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const AapArenaYtelsestypeHeader = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeaderCellProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.YTELSE_ARENA_YTELSESTYPE_AAP)}
        sortering={Sorteringsfelt.AAP_ARENA_TYPE}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.AAP_ARENA_TYPE}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Type AAP-periode (Arena)"
        title="Type AAP-periode (Arena)"
        className="col col-xs-2"
    />
);
