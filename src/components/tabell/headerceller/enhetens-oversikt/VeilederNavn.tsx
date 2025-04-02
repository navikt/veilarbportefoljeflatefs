import {HeadercelleProps} from '../HeadercelleProps';
import {Kolonne} from '../../../../ducks/ui/listevisning';
import {Header} from '../../header';

export const VeilederNavn = ({valgteKolonner}: HeadercelleProps) => (
    <Header
        skalVises={valgteKolonner.includes(Kolonne.VEILEDER)}
        headerTestId="sorteringheader_veileder"
        className="col col-xs-2"
    >
        Veileder
    </Header>
);
