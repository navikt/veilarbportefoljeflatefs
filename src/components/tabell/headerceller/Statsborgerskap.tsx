import {HeadercelleProps} from './HeadercelleProps';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {SorteringHeader} from '../sortering-header';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const Statsborgerskap = ({gjeldendeSorteringsfelt, valgteKolonner, rekkefolge, onClick}: HeadercelleProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.STATSBORGERSKAP)}
        sortering={Sorteringsfelt.STATSBORGERSKAP}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.STATSBORGERSKAP}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Statsborgerskap"
        title="Statsborgerskap personen har"
        className="col col-xs-2"
    />
);
