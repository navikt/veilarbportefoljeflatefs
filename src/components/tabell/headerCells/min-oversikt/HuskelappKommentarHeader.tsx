import {HeaderCellProps} from '../HeaderCellProps';
import {Kolonne} from '../../../../ducks/ui/listevisning';
import {SorteringHeader} from '../../sortering-header';
import {Sorteringsfelt} from '../../../../typer/kolonnesortering';

export const HuskelappKommentarHeader = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeaderCellProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.HUSKELAPP_KOMMENTAR)}
        sortering={Sorteringsfelt.HUSKELAPP_KOMMENTAR}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.HUSKELAPP_KOMMENTAR}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Huskelapp"
        title="Huskelapp"
        className="col col-xs-2"
    />
);
