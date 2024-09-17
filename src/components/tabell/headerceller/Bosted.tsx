import {HeadercelleProps} from './HeadercelleProps';
import {Sorteringsfelt} from '../../../model-interfaces';
import {Kolonne} from '../../../ducks/ui/listevisning';
import SorteringHeader from '../sortering-header';

export const Bosted = ({gjeldendeSorteringsfelt, valgteKolonner, rekkefolge, onClick}: HeadercelleProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.BOSTED_KOMMUNE)}
        sortering={Sorteringsfelt.BOSTED_KOMMUNE}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.BOSTED_KOMMUNE}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Bosted"
        title="Stedet personen bor, oftest kommunenummer"
        headerId="bosted_kommune"
        className="col col-xs-2"
    />
);
