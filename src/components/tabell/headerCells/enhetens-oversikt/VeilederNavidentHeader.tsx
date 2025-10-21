import {HeaderCellProps} from '../HeaderCellProps';
import {Kolonne} from '../../../../ducks/ui/listevisning';
import {SorteringHeader} from '../../sortering-header';
import {Sorteringsfelt} from '../../../../typer/kolonnesortering';

export const VeilederNavidentHeader = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeaderCellProps) => (
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
