import {HeaderCellProps} from '../HeaderCellProps';
import {Kolonne} from '../../../../ducks/ui/listevisning';
import {Header} from '../../header';

export const VeilederNavnHeader = ({valgteKolonner}: HeaderCellProps) => (
    <Header
        skalVises={valgteKolonner.includes(Kolonne.VEILEDER)}
        headerTestId="sorteringheader_veileder"
        className="col col-xs-2"
    >
        Veileder
    </Header>
);
