import {HeadercelleProps} from './HeadercelleProps';
import {SorteringHeader} from '../sortering-header';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const TiltakspengerRettighet = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeadercelleProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.TILTAKSPENGER_RETTIGHET)}
        sortering={Sorteringsfelt.TILTAKSPENGER_RETTIGHET}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.TILTAKSPENGER_RETTIGHET}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Rettighet (tiltakspenger)"
        title="Rettighet tiltakspenger (TPSAK)"
        className="col col-xs-2"
    />
);
