import {HeadercelleProps} from './HeadercelleProps';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {SorteringHeader} from '../sortering-header';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const GjeldendeVedtak14aVedtaksdato = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeadercelleProps) => (
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
