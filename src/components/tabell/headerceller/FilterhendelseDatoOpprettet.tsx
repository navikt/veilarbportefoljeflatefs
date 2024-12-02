import {HeadercelleProps} from './HeadercelleProps';
import {Kolonne} from '../../../ducks/ui/listevisning';
import Header from '../header';

export const FilterhendelseDatoOpprettet = ({valgteKolonner}: HeadercelleProps) => (
    <Header
        skalVises={valgteKolonner.includes(Kolonne.FILTERHENDELSE_DATO_OPPRETTET)}
        title="Dato da hendelsen ble opprettet"
        className="col col-xs-2"
    >
        Dato for hendelse
    </Header>
);
