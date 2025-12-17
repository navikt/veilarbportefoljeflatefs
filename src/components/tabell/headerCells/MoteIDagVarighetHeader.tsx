import {HeaderCellProps} from './HeaderCellProps';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {Header} from '../header';

export const MoteIDagVarighetHeader = ({valgteKolonner}: HeaderCellProps) => (
    <Header
        skalVises={valgteKolonner.includes(Kolonne.MOTER_VARIGHET)}
        title="Varighet på møtet"
        className="col col-xs-2"
    >
        Varighet møte
    </Header>
);
