import {HeadercelleProps} from './HeadercelleProps';
import {Sorteringsfelt} from '../../../model-interfaces';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {SorteringHeader} from '../sortering-header';

export const UnderVurderingVedtaksstatus = ({
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
        tekst="Status § 14 a-vedtak"
        title="Status oppfølgingvedtak"
        className="col col-xs-2"
    />
);
