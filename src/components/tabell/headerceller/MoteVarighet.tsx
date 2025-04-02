import {HeadercelleProps} from './HeadercelleProps';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {Header} from '../header';

export const MoteVarighet = ({valgteKolonner}: HeadercelleProps) => (
    <Header
        skalVises={valgteKolonner.includes(Kolonne.MOTER_VARIGHET)}
        title="Varighet på møtet"
        className="col col-xs-2"
    >
        Varighet møte
    </Header>
);
