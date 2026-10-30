import {HeaderCellProps} from './HeaderCellProps';
import {SorteringHeader} from '../sortering-header';
import {Kolonne} from '../../../ducks/ui/valgte-kolonner';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const SykmeldtSluttdatoHeader = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeaderCellProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.SYKMELDT_SLUTTDATO)}
        sortering={Sorteringsfelt.SYKMELDT_SLUTTDATO}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.SYKMELDT_SLUTTDATO}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Sluttdato sykmelding"
        title="Sluttdato sykmelding"
        className="col col-xs-2"
    />
);
