import {HeadercelleProps} from './HeadercelleProps';
import {Sorteringsfelt} from '../../../model-interfaces';
import {Kolonne} from '../../../ducks/ui/listevisning';
import SorteringHeader from '../sortering-header';

export const HuskelappFrist = ({gjeldendeSorteringsfelt, valgteKolonner, rekkefolge, onClick}: HeadercelleProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.HUSKELAPP_FRIST)}
        sortering={Sorteringsfelt.HUSKELAPP_FRIST}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.HUSKELAPP_FRIST}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Frist huskelapp"
        title="Frist huskelapp"
        headerId="huskelapp-frist"
        className="col col-xs-2"
    />
);
