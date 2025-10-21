import {HeadercelleProps} from './HeadercelleProps';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {Header} from '../header';

export const TolkebehovHeader = ({valgteKolonner}: HeadercelleProps) => (
    <Header
        skalVises={valgteKolonner.includes(Kolonne.TOLKEBEHOV)}
        title="Hvilke tolkebehov personen har"
        className="col col-xs-2"
    >
        Tolkebehov
    </Header>
);
