import {HeadercelleProps} from './HeadercelleProps';
import {SorteringHeader} from '../sortering-header';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const AapKelvinVedtakTilOgMedDato = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeadercelleProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.AAP_KELVIN_TOM_VEDTAKSDATO)}
        sortering={Sorteringsfelt.AAP_KEVLIN_VEDTAK_TOM_DATO}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.AAP_KEVLIN_VEDTAK_TOM_DATO}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Vedtak til og med"
        title="AAP-vedtak til og med (Kelvin)"
        headerTestId="sorteringheader_vedtak_til_og_med"
        className="col col-xs-2"
    />
);
