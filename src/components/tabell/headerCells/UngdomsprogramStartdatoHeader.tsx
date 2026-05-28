import {HeaderCellProps} from './HeaderCellProps';
import {SorteringHeader} from '../sortering-header';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const UngdomsprogramStartdatoHeader = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeaderCellProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.UNGDOMSPROGRAM_STARTDATO)}
        sortering={Sorteringsfelt.UNGDOMSPROGRAM_STARTDATO}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.UNGDOMSPROGRAM_STARTDATO}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Ungdomsprog.-ytelse start"
        title="Startdato ungdomsprogram-ytelse"
        className="col col-xs-2 ungdomsprogram-startdato-header"
    />
);
