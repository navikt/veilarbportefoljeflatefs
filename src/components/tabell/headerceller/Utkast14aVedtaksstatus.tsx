import {HeadercelleProps} from './HeadercelleProps';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {SorteringHeader} from '../sortering-header';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const Utkast14aVedtaksstatus = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeadercelleProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.VEDTAKSTATUS)}
        sortering={Sorteringsfelt.UTKAST_14A_STATUS}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.UTKAST_14A_STATUS}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Status oppfølgingsvedtak"
        title="Status oppfølgingsvedtak § 14 a"
        className="col col-xs-2"
    />
);
