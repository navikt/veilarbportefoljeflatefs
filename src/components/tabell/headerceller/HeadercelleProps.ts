import {Sorteringsfelt, Sorteringsrekkefolge} from '../../../model-interfaces';
import {OrNothing} from '../../../utils/types/types';
import {Kolonne} from '../../../ducks/ui/listevisning';

export interface HeadercelleProps {
    valgteKolonner: Kolonne[];
    gjeldendeSorteringsfelt: OrNothing<Sorteringsfelt>;
    rekkefolge: OrNothing<Sorteringsrekkefolge>;
    onClick: (sortering: string) => void;
}
