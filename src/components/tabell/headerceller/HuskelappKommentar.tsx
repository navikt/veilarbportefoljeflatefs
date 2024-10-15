import {HeadercelleProps} from './HeadercelleProps';
import {Sorteringsfelt} from '../../../model-interfaces';
import {Kolonne} from '../../../ducks/ui/listevisning';
import SorteringHeader from '../sortering-header';

export const HuskelappKommentar = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeadercelleProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.HUSKELAPP_KOMMENTAR)}
        sortering={Sorteringsfelt.HUSKELAPP_KOMMENTAR}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.HUSKELAPP_KOMMENTAR}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Huskelapp"
        title="Huskelapp"
        headerId="huskelapp"
        className="col col-xs-2"
    />
);
