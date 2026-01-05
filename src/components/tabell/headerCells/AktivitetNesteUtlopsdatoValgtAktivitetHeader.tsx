import {HeaderCellProps} from './HeaderCellProps';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {SorteringHeader} from '../sortering-header';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

/** Viser neste utløpsdato for aktivitetane som er valgt i Aktivitet-filtera
 * (Den heng med andre ord ikkje saman med statusfilteret "i avtalt aktivitet) */
export const AktivitetNesteUtlopsdatoValgtAktivitetHeader = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeaderCellProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.UTLOP_AKTIVITET)}
        sortering={Sorteringsfelt.VALGTE_AKTIVITETER}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.VALGTE_AKTIVITETER}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Neste utløpsdato valgt aktivitet"
        title='Neste utløpsdato på avtalt aktivitet under "Planlegger" eller "Gjennomfører"'
        className="col col-xs-2"
    />
);
