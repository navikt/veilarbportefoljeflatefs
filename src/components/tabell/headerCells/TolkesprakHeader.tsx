import {HeaderCellProps} from './HeaderCellProps';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {SorteringHeader} from '../sortering-header';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const TolkesprakHeader = ({gjeldendeSorteringsfelt, valgteKolonner, rekkefolge, onClick}: HeaderCellProps) => (
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
