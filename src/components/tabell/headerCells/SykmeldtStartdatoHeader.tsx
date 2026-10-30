import {HeaderCellProps} from './HeaderCellProps';
import {SorteringHeader} from '../sortering-header';
import {Kolonne} from '../../../ducks/ui/valgte-kolonner';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const SykmeldtStartdatoHeader = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeaderCellProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.SYKMELDT_STARTDATO)}
        sortering={Sorteringsfelt.SYKMELDT_STARTDATO}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.SYKMELDT_STARTDATO}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Første sykefraværsdato"
        title="Første sykefraværsdato"
        className="col col-xs-2"
    />
);
