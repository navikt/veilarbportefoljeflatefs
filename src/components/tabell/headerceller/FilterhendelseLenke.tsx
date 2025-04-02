import {HeadercelleProps} from './HeadercelleProps';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {Header} from '../header';

export const FilterhendelseLenke = ({valgteKolonner}: HeadercelleProps) => (
    <Header
        skalVises={valgteKolonner.includes(Kolonne.FILTERHENDELSE_LENKE)}
        title="Lenke til hendelsen"
        className="col col-xs-2-5"
    >
        Hendelse
    </Header>
);
