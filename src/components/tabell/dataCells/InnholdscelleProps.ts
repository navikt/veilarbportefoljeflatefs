import {BrukerModell} from '../../../typer/bruker-modell';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {FiltervalgModell} from '../../../typer/filtervalg-modell';

export interface InnholdscelleProps {
    bruker: BrukerModell;
    valgteKolonner: Kolonne[];
}

export interface InnholdscelleMedLenkeProps extends InnholdscelleProps {
    enhetId: string;
}

export interface InnholdscelleMedDataBasertPaFiltervalgProps extends InnholdscelleProps {
    filtervalg: FiltervalgModell;
}
