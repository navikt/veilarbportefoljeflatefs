import {HeadercelleProps} from './HeadercelleProps';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {SorteringHeader} from '../sortering-header';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const GjeldendeVedtak14aInnsatsgruppe = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeadercelleProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.GJELDENDE_VEDTAK_14A_INNSATSGRUPPE)}
        sortering={Sorteringsfelt.GJELDENDE_VEDTAK_14A_INNSATSGRUPPE}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.GJELDENDE_VEDTAK_14A_INNSATSGRUPPE}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Innsatsgruppe"
        title="Innsatsgruppe for gjeldende vedtak § 14 a"
        className="col col-xs-2"
    />
);
