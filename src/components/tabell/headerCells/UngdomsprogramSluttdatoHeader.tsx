import {HeaderCellProps} from './HeaderCellProps';
import {SorteringHeader} from '../sortering-header';
import {Kolonne} from '../../../ducks/ui/valgte-kolonner';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const UngdomsprogramSluttdatoHeader = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeaderCellProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.UNGDOMSPROGRAM_SLUTTDATO)}
        sortering={Sorteringsfelt.UNGDOMSPROGRAM_SLUTTDATO}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.UNGDOMSPROGRAM_SLUTTDATO}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Ungdomsprog.-ytelse sluttdato"
        title="Sluttdato ungdomsprogram-ytelse"
        className="col col-xs-2 ungdomsprogram-sluttdato-header"
    />
);
