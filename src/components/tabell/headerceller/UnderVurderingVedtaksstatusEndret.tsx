import {HeadercelleProps} from './HeadercelleProps';
import {Sorteringsfelt} from '../../../model-interfaces';
import {Kolonne} from '../../../ducks/ui/listevisning';
import SorteringHeader from '../sortering-header';

export const UnderVurderingVedtaksstatusEndret = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeadercelleProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.VEDTAKSTATUS_ENDRET)}
        sortering={Sorteringsfelt.UTKAST_14A_STATUS_ENDRET}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.UTKAST_14A_STATUS_ENDRET}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Statusendring"
        title="Dager siden statusendring på utkast for § 14 a-vedtak"
        className="col col-xs-2"
    />
);
