import {HeadercelleProps} from './HeadercelleProps';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {SorteringHeader} from '../sortering-header';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const GeografiskBostedSistOppdatert = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeadercelleProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.BOSTED_SIST_OPPDATERT)}
        sortering={Sorteringsfelt.BOSTED_SIST_OPPDATERT}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.BOSTED_SIST_OPPDATERT}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Bosted oppdatert"
        title="Dato for siste oppdatering av bosted"
        className="col col-xs-2"
    />
);
