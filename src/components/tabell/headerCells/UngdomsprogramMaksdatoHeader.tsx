import {HeaderCellProps} from './HeaderCellProps';
import {SorteringHeader} from '../sortering-header';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const UngdomsprogramMaksdatoHeader = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeaderCellProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.UNGDOMSPROGRAM_MAKSDATO)}
        sortering={Sorteringsfelt.UNGDOMSPROGRAM_MAKSDATO}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.UNGDOMSPROGRAM_MAKSDATO}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Ungdomsprogramytelse slutt"
        title="Sluttdato ungdomsprogramytelse"
        className="col col-xs-2 ungdomsprogram-maksdato-header"
    />
);
