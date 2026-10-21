import {HeaderCellProps} from './HeaderCellProps';
import {SorteringHeader} from '../sortering-header';
import {Kolonne} from '../../../ducks/ui/valgte-kolonner';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const SykmeldtHarArbeidsgiverHeader = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeaderCellProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.SYKMELDT_HAR_ARBEIDSGIVER)}
        sortering={Sorteringsfelt.SYKMELDT_HAR_ARBEIDSGIVER}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.SYKMELDT_HAR_ARBEIDSGIVER}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Sykmeldt har arbeidsgiver"
        title="Sykmeldt har arbeidsgiver"
        className="col col-xs-2"
    />
);
