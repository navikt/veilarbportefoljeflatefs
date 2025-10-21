import {HeaderCellProps} from './HeaderCellProps';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {SorteringHeader} from '../sortering-header';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const FodelandHeader = ({gjeldendeSorteringsfelt, valgteKolonner, rekkefolge, onClick}: HeaderCellProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.FODELAND)}
        sortering={Sorteringsfelt.FODELAND}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.FODELAND}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Fødeland"
        title="Landet personen er født i"
        className="col col-xs-2"
    />
);
