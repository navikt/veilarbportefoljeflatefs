import {HeadercelleProps} from './HeadercelleProps';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {SorteringHeader} from '../sortering-header';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const GjeldendeVedtak14aHovedmal = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeadercelleProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.GJELDENDE_VEDTAK_14A_HOVEDMAL)}
        sortering={Sorteringsfelt.GJELDENDE_VEDTAK_14A_HOVEDMAL}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.GJELDENDE_VEDTAK_14A_HOVEDMAL}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Hovedmål"
        title="Hovedmål for gjeldende vedtak § 14 a"
        className="col col-xs-2"
    />
);
