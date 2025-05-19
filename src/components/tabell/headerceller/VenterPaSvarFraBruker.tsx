import {HeadercelleProps} from './HeadercelleProps';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {SorteringHeader} from '../sortering-header';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const VenterPaSvarFraBruker = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeadercelleProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.VENTER_SVAR_FRA_BRUKER_DATO)}
        sortering={Sorteringsfelt.VENTER_PA_SVAR_FRA_BRUKER}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.VENTER_PA_SVAR_FRA_BRUKER}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Dato på melding"
        title='Dato på meldingen som er merket "Venter på svar fra bruker"'
        className="col col-xs-2"
    />
);
