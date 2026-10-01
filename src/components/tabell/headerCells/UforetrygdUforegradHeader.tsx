import {HeaderCellProps} from './HeaderCellProps';
import {SorteringHeader} from '../sortering-header';
import {Kolonne} from '../../../ducks/ui/valgte-kolonner';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const UforetrygdUforegradHeader = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeaderCellProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.UFORETRYGD_UFOREGRAD)}
        sortering={Sorteringsfelt.UFORETRYGD_UFOREGRAD}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.UFORETRYGD_UFOREGRAD}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Uføregrad"
        title="Uføregrad"
        className="col col-xs-2"
    />
);
