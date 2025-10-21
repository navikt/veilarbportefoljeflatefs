import {HeaderCellProps} from './HeaderCellProps';
import {SorteringHeader} from '../sortering-header';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const AapKelvinVedtakTilOgMedDatoHeaderHeader = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeaderCellProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.AAP_KELVIN_TOM_VEDTAKSDATO)}
        sortering={Sorteringsfelt.AAP_KEVLIN_VEDTAK_TOM_DATO}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.AAP_KEVLIN_VEDTAK_TOM_DATO}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Vedtak t.o.m. (AAP)"
        title="AAP-vedtak til og med (Kelvin)"
        className="col col-xs-2"
    />
);
