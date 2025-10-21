import {HeaderCellProps} from './HeaderCellProps';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {SorteringHeader} from '../sortering-header';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const FilterhendelseDatoOpprettetHeaderHeader = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeaderCellProps) => (
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
