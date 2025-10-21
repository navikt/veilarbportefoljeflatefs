import {HeaderCellProps} from './HeaderCellProps';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {SorteringHeader} from '../sortering-header';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const Utkast14aVedtaksstatusHeader = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeaderCellProps) => (
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
