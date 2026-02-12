import {HeaderCellProps} from './HeaderCellProps';
import {SorteringHeader} from '../sortering-header';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const DagpengerResterendeDagerHeader = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeaderCellProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.DAGPENGER_ANTALL_RESTERENDE_DAGER)}
        sortering={Sorteringsfelt.DAGPENGER_ANTALL_RESTERENDE_DAGER}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.DAGPENGER_ANTALL_RESTERENDE_DAGER}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Gjenstående dager dagpenger (DPSAK)"
        title="Gjenstående dager rettighet dagpenger (DPSAK)"
        className="col col-xs-2"
    />
);
