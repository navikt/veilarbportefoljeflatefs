import {HeadercelleProps} from './HeadercelleProps';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {SorteringHeader} from '../sortering-header';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const Tolkesprak = ({gjeldendeSorteringsfelt, valgteKolonner, rekkefolge, onClick}: HeadercelleProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.TOLKESPRAK)}
        sortering={Sorteringsfelt.TOLKESPRAK}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.TOLKESPRAK}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Tolkespråk"
        title="Hvilket språk tolken må kunne"
        className="col col-xs-2"
    />
);
