import {HeadercelleProps} from '../HeadercelleProps';
import {Kolonne} from '../../../../ducks/ui/listevisning';
import {SorteringHeader} from '../../sortering-header';
import {Sorteringsfelt} from '../../../../typer/kolonnesortering';

export const VeilederNavident = ({gjeldendeSorteringsfelt, valgteKolonner, rekkefolge, onClick}: HeadercelleProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.NAVIDENT)}
        sortering={Sorteringsfelt.NAVIDENT}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.NAVIDENT}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Nav-ident"
        title="Nav-ident på tildelt veileder"
        className="header__veilederident col col-xs-2"
    />
);
