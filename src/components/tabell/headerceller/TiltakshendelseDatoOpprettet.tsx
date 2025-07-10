import {HeadercelleProps} from './HeadercelleProps';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {SorteringHeader} from '../sortering-header';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const TiltakshendelseDatoOpprettet = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeadercelleProps) => (
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
