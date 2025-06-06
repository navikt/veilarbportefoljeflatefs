import {BrukerModell} from '../../../typer/bruker-modell';
import {Kolonne} from '../../../ducks/ui/listevisning';

export interface InnholdscelleProps {
    bruker: BrukerModell;
    valgteKolonner: Kolonne[];
}
