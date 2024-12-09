import {HeadercelleProps} from './HeadercelleProps';
import {Sorteringsfelt} from '../../../model-interfaces';
import {Kolonne} from '../../../ducks/ui/listevisning';
import SorteringHeader from '../sortering-header';

export const VenterPaSvarFraNav = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeadercelleProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.VENTER_SVAR_FRA_NAV_DATO)}
        sortering={Sorteringsfelt.VENTER_PA_SVAR_FRA_NAV}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.VENTER_PA_SVAR_FRA_NAV}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Dato på melding"
        title='Dato på meldingen som er merket "Venter på svar fra NAV"'
        className="col col-xs-2"
    />
);
