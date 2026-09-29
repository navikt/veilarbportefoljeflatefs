import {HeaderCellProps} from './HeaderCellProps';
import {SorteringHeader} from '../sortering-header';
import {Kolonne} from '../../../ducks/ui/valgte-kolonner';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const UforetrygdVirkningsdatoHeader = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeaderCellProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.UFORETRYGD_VIRKNINGSDATO)}
        sortering={Sorteringsfelt.UFORETRYGD_VIRKNINGSDATO}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.UFORETRYGD_VIRKNINGSDATO}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Første virkningsdato uføretrygd"
        title="Første virkningsdato uføretrygd"
        className="col col-xs-2"
    />
);
