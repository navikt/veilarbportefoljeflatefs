import {HeadercelleProps} from './HeadercelleProps';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {SorteringHeader} from '../sortering-header';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const OppfolgingStartet = ({gjeldendeSorteringsfelt, valgteKolonner, rekkefolge, onClick}: HeadercelleProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.OPPFOLGING_STARTET)}
        sortering={Sorteringsfelt.OPPFOLGING_STARTET}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.OPPFOLGING_STARTET}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Oppfølging startet"
        title="Startdato for pågående oppfølgingsperiode"
        headerTestId="sorteringheader_oppfolging-startet"
        className="col col-xs-2"
    />
);
