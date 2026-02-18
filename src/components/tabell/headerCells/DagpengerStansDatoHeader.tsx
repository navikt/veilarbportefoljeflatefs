import {HeaderCellProps} from './HeaderCellProps';
import {SorteringHeader} from '../sortering-header';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const DagpengerStansDatoHeader = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeaderCellProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.DAGPENGER_STANS)}
        sortering={Sorteringsfelt.DAGPENGER_STANS}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.DAGPENGER_STANS}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Utløp dagpenger (DPSAK)"
        title="Utløp dagpenger (DPSAK)"
        className="col col-xs-2"
    />
);
