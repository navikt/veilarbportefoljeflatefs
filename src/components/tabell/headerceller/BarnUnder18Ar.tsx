import {HeadercelleProps} from './HeadercelleProps';
import {Sorteringsfelt} from '../../../model-interfaces';
import {Kolonne} from '../../../ducks/ui/listevisning';
import SorteringHeader from '../sortering-header';

export const BarnUnder18Aar = ({gjeldendeSorteringsfelt, valgteKolonner, rekkefolge, onClick}: HeadercelleProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.BARN_UNDER_18_AAR)}
        sortering={Sorteringsfelt.BARN_UNDER_18_AAR}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.BARN_UNDER_18_AAR}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Barn under 18 år"
        title="Antall og alder på barn under 18 år"
        headerId="barn_under_18"
        className="col col-xs-2"
    />
);
