import {HeadercelleProps} from './HeadercelleProps';
import {Sorteringsfelt} from '../../../model-interfaces';
import {Kolonne} from '../../../ducks/ui/listevisning';
import SorteringHeader from '../sortering-header';

export const StatsborgerskapGyldigFra = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeadercelleProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.STATSBORGERSKAP_GYLDIG_FRA)}
        sortering={Sorteringsfelt.STATSBORGERSKAP_GYLDIG_FRA}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.STATSBORGERSKAP_GYLDIG_FRA}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Gyldig fra"
        title="Statsborgerskap gyldig fra"
        headerId="statsborgerskap_gyldig_fra"
        className="col col-xs-2"
    />
);
