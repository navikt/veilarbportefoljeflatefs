import {HeadercelleProps} from './HeadercelleProps';
import {Sorteringsfelt} from '../../../model-interfaces';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {SorteringHeader} from '../sortering-header';

export const FilterhendelseDatoOpprettet = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeadercelleProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.FILTERHENDELSE_DATO_OPPRETTET)}
        sortering={Sorteringsfelt.FILTERHENDELSE_DATO_OPPRETTET}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.FILTERHENDELSE_DATO_OPPRETTET}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Dato for hendelse"
        title="Dato da hendelsen ble opprettet"
        className="col col-xs-2"
    />
);
