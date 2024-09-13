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
        tekst="Språk"
        title="Tolkespråk"
        headerId="tolkespraak"
        className="col col-xs-2"
    />
);
