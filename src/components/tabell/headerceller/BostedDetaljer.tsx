import {HeadercelleProps} from './HeadercelleProps';
import {Sorteringsfelt} from '../../../model-interfaces';
import {Kolonne} from '../../../ducks/ui/listevisning';
import SorteringHeader from '../sortering-header';

export const BostedDetaljer = ({gjeldendeSorteringsfelt, valgteKolonner, rekkefolge, onClick}: HeadercelleProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.BOSTED_BYDEL)}
        sortering={Sorteringsfelt.BOSTED_BYDEL}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.BOSTED_BYDEL}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Bosted detaljer"
        title="Bydelen personen bor i (om det finnes en)"
        headerId="bosted_bydel"
        className="col col-xs-2"
    />
);
