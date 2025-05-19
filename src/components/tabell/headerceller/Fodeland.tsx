import {HeadercelleProps} from './HeadercelleProps';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {SorteringHeader} from '../sortering-header';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const Fodeland = ({gjeldendeSorteringsfelt, valgteKolonner, rekkefolge, onClick}: HeadercelleProps) => (
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
