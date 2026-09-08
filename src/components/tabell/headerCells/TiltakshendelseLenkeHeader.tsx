import {HeaderCellProps} from './HeaderCellProps';
import {Kolonne} from '../../../ducks/ui/valgte-kolonner';
import {SorteringHeader} from '../sortering-header';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const TiltakshendelseLenkeHeader = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeaderCellProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.TILTAKSHENDELSE_LENKE)}
        sortering={Sorteringsfelt.TILTAKSHENDELSE_TEKST}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.TILTAKSHENDELSE_TEKST}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Hendelse på tiltak"
        title="Lenke til hendelsen"
        className="col col-xs-3"
    />
);
