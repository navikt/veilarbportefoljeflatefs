import {HeadercelleProps} from './HeadercelleProps';
import {Sorteringsfelt} from '../../../model-interfaces';
import {Kolonne} from '../../../ducks/ui/listevisning';
import SorteringHeader from '../sortering-header';

export const SvarfristCv = ({gjeldendeSorteringsfelt, valgteKolonner, rekkefolge, onClick}: HeadercelleProps) => (
    // TODO: Sjå over "tekst", burde det vore "Svarfrist CV" i staden?
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.CV_SVARFRIST)}
        sortering={Sorteringsfelt.CV_SVARFRIST}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.CV_SVARFRIST}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="CV svarfrist"
        title="Svarfrist for å svare ja til deling av CV"
        headerId="cv-svarfrist"
        className="col col-xs-2"
    />
);
