import {HeaderCellProps} from './HeaderCellProps';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {SorteringHeader} from '../sortering-header';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const TildeltTidspunktHeader = ({
    gjeldendeSorteringsfelt,
    rekkefolge,
    onClick,
    valgteKolonner
}: HeaderCellProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.TILDELT_TIDSPUNKT)}
        sortering={Sorteringsfelt.TILDELT_TIDSPUNKT}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.TILDELT_TIDSPUNKT}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Tildelingsdato"
        title="Datoen da brukeren ble tildelt veileder"
        className="col col-xs-2"
    >
        Tildelingsdato
    </SorteringHeader>
);
