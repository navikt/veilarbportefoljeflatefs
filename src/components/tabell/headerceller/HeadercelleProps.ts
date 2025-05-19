import {OrNothing} from '../../../utils/types/types';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {Sorteringsfelt, Sorteringsrekkefolge} from '../../../typer/kolonnesortering';

export interface HeadercelleProps {
    valgteKolonner: Kolonne[];
    gjeldendeSorteringsfelt: OrNothing<Sorteringsfelt>;
    rekkefolge: OrNothing<Sorteringsrekkefolge>;
    onClick: (sortering: string) => void;
}
