import {HeaderCellProps} from './HeaderCellProps';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {SorteringHeader} from '../sortering-header';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const BarnUnder18AarHeader = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeaderCellProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.BARN_UNDER_18_AAR)}
        sortering={Sorteringsfelt.BARN_UNDER_18_AR}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.BARN_UNDER_18_AR}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Barn under 18 år"
        title="Antall og alder på barn under 18 år"
        className="col col-xs-2"
    />
);
