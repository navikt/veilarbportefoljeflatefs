import {HeadercelleProps} from './HeadercelleProps';
import {Sorteringsfelt} from '../../../model-interfaces';
import {Kolonne} from '../../../ducks/ui/listevisning';
import SorteringHeader from '../sortering-header';

export const AvtaltAktivitet = ({gjeldendeSorteringsfelt, valgteKolonner, rekkefolge, onClick}: HeadercelleProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.AVTALT_AKTIVITET)}
        sortering={Sorteringsfelt.I_AVTALT_AKTIVITET}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.I_AVTALT_AKTIVITET}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Neste utløpsdato aktivitet"
        title='Neste utløpsdato på avtalt aktivitet under "Planlegger" eller "Gjennomfører"'
        headerTestId="sorteringheader_i-avtalt-aktivitet"
        className="col col-xs-2"
    />
);
