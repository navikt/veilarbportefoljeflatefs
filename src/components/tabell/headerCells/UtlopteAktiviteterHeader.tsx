import {HeaderCellProps} from './HeaderCellProps';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {SorteringHeader} from '../sortering-header';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const UtlopteAktiviteterHeader = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeaderCellProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.UTLOPTE_AKTIVITETER)}
        sortering={Sorteringsfelt.UTLOPTE_AKTIVITETER}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.UTLOPTE_AKTIVITETER}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Utløpsdato aktivitet"
        title='Utløpsdato på avtalt aktivitet under "Planlegger" eller "Gjennomfører"'
        className="col col-xs-2"
    />
);
