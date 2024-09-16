import {HeadercelleProps} from './HeadercelleProps';
import {Sorteringsfelt} from '../../../model-interfaces';
import {Kolonne} from '../../../ducks/ui/listevisning';
import SorteringHeader from '../sortering-header';

export const BarnUnder18Aar = ({gjeldendeSorteringsfelt, valgteKolonner, rekkefolge, onClick}: HeadercelleProps) => (
    // TODO: Sjå over titteltekst. Kan vi seie noko her om kva type informasjon vi viser i kolonna? Er det eit tal, namna på ungane, noko heilt anna?
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.BARN_UNDER_18_AAR)}
        sortering={Sorteringsfelt.BARN_UNDER_18_AAR}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.BARN_UNDER_18_AAR}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Barn under 18 år"
        title="Barn under 18 år"
        headerId="barn_under_18"
        className="col col-xs-2"
    />
);
