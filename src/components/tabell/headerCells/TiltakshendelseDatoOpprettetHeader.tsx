import {HeaderCellProps} from './HeaderCellProps';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {SorteringHeader} from '../sortering-header';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const TiltakshendelseDatoOpprettetHeader = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeaderCellProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.TILTAKSHENDELSE_DATO_OPPRETTET)}
        sortering={Sorteringsfelt.TILTAKSHENDELSE_DATO_OPPRETTET}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.TILTAKSHENDELSE_DATO_OPPRETTET}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Dato for hendelse"
        title="Dato da hendelsen ble opprettet"
        className="col col-xs-2"
    />
);
