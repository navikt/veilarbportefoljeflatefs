import {HeaderCellProps} from './HeaderCellProps';
import {SorteringHeader} from '../sortering-header';
import {Kolonne} from '../../../ducks/ui/valgte-kolonner';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const ArbeidssoekerPeriodeAvsluttetdatoHeader = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeaderCellProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.HAR_IKKE_AKTIV_PERIODE_I_ARBEIDSSOEKERREGISTERET)}
        sortering={Sorteringsfelt.ARBEIDSSOEKERREGISTERET_PERIODE_AVSLUTTETDATO}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.ARBEIDSSOEKERREGISTERET_PERIODE_AVSLUTTETDATO}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Sist avsluttet arbeidssøkerperiode"
        title="Sist avsluttet arbeidssøkerperiode i oppfølgingsperioden"
        className="col col-xs-2"
    />
);
