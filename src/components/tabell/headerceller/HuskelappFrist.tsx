import {HeadercelleProps} from './HeadercelleProps';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {SorteringHeader} from '../sortering-header';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const HuskelappFrist = ({gjeldendeSorteringsfelt, valgteKolonner, rekkefolge, onClick}: HeadercelleProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.HUSKELAPP_FRIST)}
        sortering={Sorteringsfelt.HUSKELAPP_FRIST}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.HUSKELAPP_FRIST}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Frist huskelapp"
        title="Fristen som er satt på huskelappen"
        className="col col-xs-2"
    />
);
