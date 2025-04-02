import {HeadercelleProps} from './HeadercelleProps';
import {Sorteringsfelt} from '../../../model-interfaces';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {SorteringHeader} from '../sortering-header';

export const EnsligeForsorgereAktivitetsplikt = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeadercelleProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.ENSLIGE_FORSORGERE_AKIVITETSPLIKT)}
        sortering={Sorteringsfelt.ENSLIGE_FORSORGERE_AKTIVITETSPLIKT}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.ENSLIGE_FORSORGERE_AKTIVITETSPLIKT}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Om aktivitetsplikt overgangsstønad"
        title="Om bruker har aktivitetsplikt på overgangsstønad"
        className="col col-xs-2"
    />
);
