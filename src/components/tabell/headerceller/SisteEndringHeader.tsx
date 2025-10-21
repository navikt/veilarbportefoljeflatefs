import {HeaderCellProps} from './HeaderCellProps';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {Header} from '../header';

export const SisteEndringHeader = ({valgteKolonner}: HeaderCellProps) => (
    // Dette er siste endring frå under "Hendelser", i aktiviteter personen sjølv har oppretta.
    <Header
        skalVises={valgteKolonner.includes(Kolonne.SISTE_ENDRING)}
        title="Personens siste endring av aktiviteter/mål"
        className="col col-xs-2"
    >
        Siste endring
    </Header>
);
