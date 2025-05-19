import {HeadercelleProps} from './HeadercelleProps';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {SorteringHeader} from '../sortering-header';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const UtlopteAktiviteter = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeadercelleProps) => (
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
