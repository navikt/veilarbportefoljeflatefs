import {HeadercelleProps} from './HeadercelleProps';
import {Sorteringsfelt} from '../../../model-interfaces';
import {Kolonne} from '../../../ducks/ui/listevisning';
import SorteringHeader from '../sortering-header';

export const BostedBydel = ({gjeldendeSorteringsfelt, valgteKolonner, rekkefolge, onClick}: HeadercelleProps) => (
    // TODO: Sjå over titteltekst og sjekk at det faktisk er "bydel" som vert vist for alle innbyggarar
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.BOSTED_BYDEL)}
        sortering={Sorteringsfelt.BOSTED_BYDEL}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.BOSTED_BYDEL}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Bosted detaljer"
        title="Bydelen personen bor i"
        headerId="bosted_bydel"
        className="col col-xs-2"
    />
);
