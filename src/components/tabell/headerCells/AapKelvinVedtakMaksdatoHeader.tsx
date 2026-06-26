import {HeaderCellProps} from './HeaderCellProps';
import {SorteringHeader} from '../sortering-header';
import {Kolonne} from '../../../ducks/ui/valgte-kolonner';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const AapKelvinVedtakMaksdatoHeader = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeaderCellProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.AAP_KELVIN_MAKSDATO)}
        sortering={Sorteringsfelt.AAP_KELVIN_MAKSDATO}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.AAP_KELVIN_MAKSDATO}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Maksdato AAP (Kelvin)"
        title="Maksdato er siste dag med mulig rett til AAP"
        className="col col-xs-2"
    />
);
