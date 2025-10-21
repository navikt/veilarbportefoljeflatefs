import {HeaderCellProps} from './HeaderCellProps';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {SorteringHeader} from '../sortering-header';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

/** Denne viser kommune, "Utland eller "Ukjent". */
export const GeografiskBostedHeader = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeaderCellProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.BOSTED_KOMMUNE)}
        sortering={Sorteringsfelt.BOSTED_KOMMUNE}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.BOSTED_KOMMUNE}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Bosted"
        title="Kommunen personen bor i"
        className="col col-xs-2"
    />
);
