import {HeadercelleProps} from './HeadercelleProps';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {SorteringHeader} from '../sortering-header';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const MoterIDag = ({gjeldendeSorteringsfelt, valgteKolonner, rekkefolge, onClick}: HeadercelleProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.MOTER_IDAG)}
        sortering={Sorteringsfelt.MOTER_MED_NAV_IDAG}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.MOTER_MED_NAV_IDAG}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Klokkeslett møte"
        title="Tidspunktet møtet starter"
        className="col col-xs-2"
    />
);
