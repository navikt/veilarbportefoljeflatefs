import {HeaderCellProps} from './HeaderCellProps';
import {SorteringHeader} from '../sortering-header';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const UngdomsprogramRettighetHeader = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeaderCellProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.UNGDOMSPROGRAM_RETTIGHET)}
        sortering={Sorteringsfelt.UNGDOMSPROGRAM_RETTIGHET}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.UNGDOMSPROGRAM_RETTIGHET}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Periode"
        title="Perioden kan være ordinær eller forlenget."
        className="col col-xs-2 ungdomsprogram-rettighet-header"
    />
);
