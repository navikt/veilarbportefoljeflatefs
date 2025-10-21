import {tolkBehov} from '../../../utils/utils';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {TekstKolonne} from '../dataCellTypes/tekstkolonne';
import {DataCellMedInnholdBasertPaFiltervalgProps} from './DataCellProps';

export const TolkebehovData = ({bruker, valgteKolonner, filtervalg}: DataCellMedInnholdBasertPaFiltervalgProps) => (
    <TekstKolonne
        tekst={tolkBehov(filtervalg, bruker)}
        skalVises={valgteKolonner.includes(Kolonne.TOLKEBEHOV)}
        className="col col-xs-2"
    />
);
