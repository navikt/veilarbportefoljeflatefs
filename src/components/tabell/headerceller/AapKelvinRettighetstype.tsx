import {HeadercelleProps} from './HeadercelleProps';
import {SorteringHeader} from '../sortering-header';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const AapKelvinRettighetstype = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeadercelleProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.AAP_KELVIN_RETTIGHETSTYPE)}
        sortering={Sorteringsfelt.AAP_KELVIN_RETTIGHETSTYPE}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.AAP_KELVIN_RETTIGHETSTYPE}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Rettighetstype"
        title="Rettighetstype"
        headerTestId="sorteringheader_rettighetstype"
        className="col col-xs-2"
    />
);
