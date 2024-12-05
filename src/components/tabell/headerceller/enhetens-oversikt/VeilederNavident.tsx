import {HeadercelleProps} from '../HeadercelleProps';
import {Sorteringsfelt} from '../../../../model-interfaces';
import {Kolonne} from '../../../../ducks/ui/listevisning';
import SorteringHeader from '../../sortering-header';

export const VeilederNavident = ({gjeldendeSorteringsfelt, valgteKolonner, rekkefolge, onClick}: HeadercelleProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.NAVIDENT)}
        sortering={Sorteringsfelt.NAVIDENT}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.NAVIDENT}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="NAV-ident"
        title="NAV-ident på tildelt veileder"
        className="header__veilederident col col-xs-2"
    />
);
