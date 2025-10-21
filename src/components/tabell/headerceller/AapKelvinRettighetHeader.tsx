import {HeadercelleProps} from './HeadercelleProps';
import {SorteringHeader} from '../sortering-header';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const AapKelvinRettighetHeader = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeadercelleProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.AAP_KELVIN_RETTIGHET)}
        sortering={Sorteringsfelt.AAP_KELVIN_RETTIGHET}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.AAP_KELVIN_RETTIGHET}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Rettighet (AAP)"
        title="Rettighet AAP (Kelvin)"
        className="col col-xs-2"
    />
);
