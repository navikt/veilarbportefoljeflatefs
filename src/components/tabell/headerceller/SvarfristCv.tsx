import {HeadercelleProps} from './HeadercelleProps';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {SorteringHeader} from '../sortering-header';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const SvarfristCv = ({gjeldendeSorteringsfelt, valgteKolonner, rekkefolge, onClick}: HeadercelleProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.CV_SVARFRIST)}
        sortering={Sorteringsfelt.CV_SVARFRIST}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.CV_SVARFRIST}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Frist deling av CV"
        title="Frist for at personen skal svare ja til deling av CV med arbeidsgiver"
        className="col col-xs-2"
    />
);
