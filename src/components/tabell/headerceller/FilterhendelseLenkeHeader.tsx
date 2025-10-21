import {HeaderCellProps} from './HeaderCellProps';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {Header} from '../header';

export const FilterhendelseLenkeHeader = ({valgteKolonner}: HeaderCellProps) => (
    <Header
        skalVises={valgteKolonner.includes(Kolonne.FILTERHENDELSE_LENKE)}
        title="Lenke til hendelsen"
        className="col col-xs-2-5"
    >
        Hendelse
    </Header>
);
