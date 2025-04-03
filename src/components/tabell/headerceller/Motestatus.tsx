import {HeadercelleProps} from './HeadercelleProps';
import {Sorteringsfelt} from '../../../model-interfaces';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {SorteringHeader} from '../sortering-header';

export const Motestatus = ({gjeldendeSorteringsfelt, valgteKolonner, rekkefolge, onClick}: HeadercelleProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.MOTE_ER_AVTALT)}
        sortering={Sorteringsfelt.MOTESTATUS}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.MOTESTATUS}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Avtalt med Nav"
        title="Møtestatus"
        className="col col-xs-2"
    />
);
