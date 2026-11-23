import {HeaderCellProps} from './HeaderCellProps';
import {SorteringHeader} from '../sortering-header';
import {Kolonne} from '../../../ducks/ui/valgte-kolonner';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const ArbeidssoekerPeriodeStartdatoHeader = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeaderCellProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.HAR_AKTIV_PERIODE_I_ARBEIDSSOEKERREGISTERET)}
        sortering={Sorteringsfelt.ARBEIDSSOEKERREGISTERET_PERIODE_STARTDATO}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.ARBEIDSSOEKERREGISTERET_PERIODE_STARTDATO}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Startdato for arbeidssøkerperiode"
        title="Startdato for arbeidssøkerperiode"
        className="col col-xs-2"
    />
);
