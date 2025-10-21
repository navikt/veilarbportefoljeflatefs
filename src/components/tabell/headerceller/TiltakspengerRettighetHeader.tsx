import {HeaderCellProps} from './HeaderCellProps';
import {SorteringHeader} from '../sortering-header';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const TiltakspengerRettighetHeader = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeaderCellProps) => (
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
