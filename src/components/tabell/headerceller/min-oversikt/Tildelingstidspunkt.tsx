import {HeadercelleProps} from '../HeadercelleProps';
import {Kolonne} from '../../../../ducks/ui/listevisning';
import {Header} from '../../header';

export const Tildelingstidspunkt = ({
    gjeldendeSorteringsfelt,
    rekkefolge,
    onClick,
    valgteKolonner
}: HeadercelleProps) => (
    <Header
        skalVises={valgteKolonner.includes(Kolonne.TILDELINGSDATO)}
        title="Varighet på møtet"
        className="col col-s-2"
    >
        Tildelingsdato
    </Header>
);
