import {HeadercelleProps} from './HeadercelleProps';
import {Sorteringsfelt} from '../../../model-interfaces';
import {Kolonne} from '../../../ducks/ui/listevisning';
import SorteringHeader from '../sortering-header';

export const TolkebehovSistOppdatert = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeadercelleProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.TOLKEBEHOV_SIST_OPPDATERT)}
        sortering={Sorteringsfelt.TOLKEBEHOV_SIST_OPPDATERT}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.TOLKEBEHOV_SIST_OPPDATERT}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Tolkebehov oppdatert"
        title="Dato for siste oppdatering av tolkebehov"
        headerId="tolkbehovsistoppdatert"
        className="col col-xs-2"
    />
);
