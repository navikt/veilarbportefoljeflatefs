import {HeaderCellProps} from './HeaderCellProps';
import {Kolonne} from '../../../ducks/ui/valgte-kolonner';
import {SorteringHeader} from '../sortering-header';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const GjeldendeVedtak14aVedtaksdatoHeader = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeaderCellProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.GJELDENDE_VEDTAK_14A_VEDTAKSDATO)}
        sortering={Sorteringsfelt.GJELDENDE_VEDTAK_14A_VEDTAKSDATO}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.GJELDENDE_VEDTAK_14A_VEDTAKSDATO}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Vedtaksdato"
        title="Vedtaksdato for gjeldende vedtak § 14 a"
        className="col col-xs-2-5"
    />
);
