import {HeaderCellProps} from './HeaderCellProps';
import {SorteringHeader} from '../sortering-header';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const DagpengerRettighetHeader = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeaderCellProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.DAGPENGER_RETTIGHETSTYPE)}
        sortering={Sorteringsfelt.DAGPENGER_RETTIGHETSTYPE}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.DAGPENGER_RETTIGHETSTYPE}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Rettighet dagpenger (DPSAK)"
        title="Rettighet dagpenger (DPSAK)"
        className="col col-xs-2"
    />
);
