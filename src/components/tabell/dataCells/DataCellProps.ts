import {BrukerModell} from '../../../typer/bruker-modell';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {FiltervalgModell} from '../../../typer/filtervalg-modell';

export interface DataCellProps {
    bruker: BrukerModell;
    valgteKolonner: Kolonne[];
}

export interface DataCellMedLenkeProps extends DataCellProps {
    enhetId: string;
}

export interface DataCellMedInnholdBasertPaFiltervalgProps extends DataCellProps {
    filtervalg: FiltervalgModell;
}
