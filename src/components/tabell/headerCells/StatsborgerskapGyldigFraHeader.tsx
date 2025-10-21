import {HeaderCellProps} from './HeaderCellProps';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {SorteringHeader} from '../sortering-header';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const StatsborgerskapGyldigFraHeader = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeaderCellProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.STATSBORGERSKAP_GYLDIG_FRA)}
        sortering={Sorteringsfelt.STATSBORGERSKAP_GYLDIG_FRA}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.STATSBORGERSKAP_GYLDIG_FRA}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Gyldig fra"
        title="Dato statsborgerskapet er gyldig fra"
        className="col col-xs-2"
    />
);
