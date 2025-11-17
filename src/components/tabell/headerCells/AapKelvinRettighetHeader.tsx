import {HeaderCellProps} from './HeaderCellProps';
import {SorteringHeader} from '../sortering-header';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const AapKelvinRettighetHeader = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeaderCellProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.AAP_KELVIN_RETTIGHET)}
        sortering={Sorteringsfelt.AAP_KELVIN_RETTIGHET}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.AAP_KELVIN_RETTIGHET}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Rettighet AAP (Kelvin)"
        title="Rettighet AAP (Kelvin)"
        className="col col-xs-2"
    />
);
