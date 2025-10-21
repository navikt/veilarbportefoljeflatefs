import {HeaderCellProps} from './HeaderCellProps';
import {SorteringHeader} from '../sortering-header';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const HuskelappSistEndretHeader = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeaderCellProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.HUSKELAPP_SIST_ENDRET)}
        sortering={Sorteringsfelt.HUSKELAPP_SIST_ENDRET}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.HUSKELAPP_SIST_ENDRET}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Huskelapp sist endret"
        title="Datoen huskelappen er opprettet eller sist endret"
        className="col col-xs-2"
    />
);
