import {HeadercelleProps} from './HeadercelleProps';
import {SorteringHeader} from '../sortering-header';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const Tildelingsdato = ({gjeldendeSorteringsfelt, valgteKolonner, rekkefolge, onClick}: HeadercelleProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.TILDELINGSDATO)}
        sortering={Sorteringsfelt.TILDELINGSDATO}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.TILDELINGSDATO}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Tildelingsdato"
        title="Dato bruker ble tildelt en veileder"
        headerTestId="sorteringheader_tildelingsdato"
        className="col col-xs-2"
    />
);
