import {HeaderCellProps} from './HeaderCellProps';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {SorteringHeader} from '../sortering-header';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const Utkast14aVedtaksstatusEndretHeader = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeaderCellProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.VEDTAKSTATUS_ENDRET)}
        sortering={Sorteringsfelt.UTKAST_14A_STATUS_ENDRET}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.UTKAST_14A_STATUS_ENDRET}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Dager siden statusendring"
        title="Dager siden statusendring på utkast for oppfølgingsvedtak § 14 a"
        className="col col-xs-2"
    />
);
