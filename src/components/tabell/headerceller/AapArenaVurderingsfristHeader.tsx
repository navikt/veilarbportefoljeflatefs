import {HeadercelleProps} from './HeadercelleProps';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {SorteringHeader} from '../sortering-header';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const AapArenaVurderingsfristHeader = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeadercelleProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.YTELSE_ARENA_VURDERINGSFRIST_AAP)}
        sortering={Sorteringsfelt.AAP_ARENA_VURDERINGSFRIST}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.AAP_ARENA_VURDERINGSFRIST}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Frist vurdering rett AAP"
        title="Omtrentlig frist for ny vurdering av AAP (Arena)"
        className="col col-xs-2"
    />
);
