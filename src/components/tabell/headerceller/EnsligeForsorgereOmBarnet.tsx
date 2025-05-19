import {HeadercelleProps} from './HeadercelleProps';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {SorteringHeader} from '../sortering-header';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const EnsligeForsorgereOmBarnet = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeadercelleProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.ENSLIGE_FORSORGERE_OM_BARNET)}
        sortering={Sorteringsfelt.ENSLIGE_FORSORGERE_OM_BARNET}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.ENSLIGE_FORSORGERE_OM_BARNET}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Om barnet"
        title="Dato når barnet er hhv. 6 mnd/1 år gammelt"
        headerTestId="sorteringheader_enslige-forsorgere-om-barnet"
        className="col col-xs-3"
    />
);
