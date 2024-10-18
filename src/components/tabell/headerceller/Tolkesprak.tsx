import {HeadercelleProps} from './HeadercelleProps';
import {Sorteringsfelt} from '../../../model-interfaces';
import {Kolonne} from '../../../ducks/ui/listevisning';
import SorteringHeader from '../sortering-header';

export const Tolkesprak = ({gjeldendeSorteringsfelt, valgteKolonner, rekkefolge, onClick}: HeadercelleProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.TOLKESPRAK)}
        sortering={Sorteringsfelt.TOLKESPRAK}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.TOLKESPRAK}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Tolkespråk"
        title="Hvilket språk tolken må kunne"
        headerId="tolkespraak"
        className="col col-xs-2"
    />
);
