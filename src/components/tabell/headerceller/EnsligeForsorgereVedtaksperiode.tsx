import {HeadercelleProps} from './HeadercelleProps';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {SorteringHeader} from '../sortering-header';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const EnsligeForsorgereVedtaksperiode = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeadercelleProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.ENSLIGE_FORSORGERE_VEDTAKSPERIODE)}
        sortering={Sorteringsfelt.ENSLIGE_FORSORGERE_VEDTAKSPERIODETYPE}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.ENSLIGE_FORSORGERE_VEDTAKSPERIODETYPE}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Type vedtaksperiode overgangsstønad"
        title="Type vedtaksperiode for overgangsstønad"
        className="col col-xs-2"
    />
);
