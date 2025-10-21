import {HeadercelleProps} from './HeadercelleProps';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {SorteringHeader} from '../sortering-header';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const AapArenaVedtaksperiodeHeader = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeadercelleProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.YTELSE_ARENA_VEDTAKSPERIODE_AAP)}
        sortering={Sorteringsfelt.UTLOPSDATO_AAP_OG_TILTAKSPENGER_ARENA}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.UTLOPSDATO_AAP_OG_TILTAKSPENGER_ARENA}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Gjenstående uker vedtak AAP"
        title="Gjenstående uker på gjeldende vedtak AAP (Arena)"
        className="col col-xs-2"
    />
);
