import {HeadercelleProps} from './HeadercelleProps';
import {Sorteringsfelt} from '../../../model-interfaces';
import {Kolonne} from '../../../ducks/ui/listevisning';
import SorteringHeader from '../sortering-header';

export const BostedSistOppdatert = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeadercelleProps) => (
    // TODO: Sjå over titteltekst
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.BOSTED_SIST_OPPDATERT)}
        sortering={Sorteringsfelt.BOSTED_SIST_OPPDATERT}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.BOSTED_SIST_OPPDATERT}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Bosted sist oppdatert"
        title="Tidspunkt for siste oppdatering av bosted"
        headerId="bosted_sist_oppdatert"
        className="col col-xs-2"
    />
);
