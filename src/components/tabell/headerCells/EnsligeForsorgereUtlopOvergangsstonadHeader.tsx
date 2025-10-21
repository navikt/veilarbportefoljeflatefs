import {HeaderCellProps} from './HeaderCellProps';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {SorteringHeader} from '../sortering-header';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const EnsligeForsorgereUtlopOvergangsstonadHeader = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeaderCellProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.ENSLIGE_FORSORGERE_UTLOP_OVERGANGSSTONAD)}
        sortering={Sorteringsfelt.ENSLIGE_FORSORGERE_UTLOP_YTELSE}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.ENSLIGE_FORSORGERE_UTLOP_YTELSE}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Utløp overgangsstønad"
        title="Utløpsdato for overgangsstønad"
        headerTestId="sorteringheader_utlop_overgangsstonad"
        className="col col-xs-2"
    />
);
