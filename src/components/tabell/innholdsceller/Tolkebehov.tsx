import {tolkBehov} from '../../../utils/utils';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {TekstKolonne} from '../kolonner/tekstkolonne';
import {InnholdscelleProps} from './InnholdscelleProps';
import {FiltervalgModell} from '../../../typer/filtervalg-modell';

export interface TolkebehovProps extends InnholdscelleProps {
    filtervalg: FiltervalgModell;
}

export const Tolkebehov = ({bruker, valgteKolonner, filtervalg}: TolkebehovProps) => (
    <TekstKolonne
        tekst={tolkBehov(filtervalg, bruker)}
        skalVises={valgteKolonner.includes(Kolonne.TOLKEBEHOV)}
        className="col col-xs-2"
    />
);
