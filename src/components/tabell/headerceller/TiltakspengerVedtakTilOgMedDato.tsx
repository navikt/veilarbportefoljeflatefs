import {HeadercelleProps} from './HeadercelleProps';
import {SorteringHeader} from '../sortering-header';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const TiltakspengerVedtakTilOgMedDato = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeadercelleProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.TILTAKSPENGER_VEDTAKSDATO_TOM)}
        sortering={Sorteringsfelt.TILTAKSPENGER_VEDTAKSDATO_TOM}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.TILTAKSPENGER_VEDTAKSDATO_TOM}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Vedtak til og med"
        title="Tiltakspenger vedtak til og med (TPSAK)"
        headerTestId="sorteringheader_vedtak_til_og_med_tiltakspenger"
        className="col col-xs-2"
    />
);
