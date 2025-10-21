import {tolkBehovSpraak} from '../../../utils/utils';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {TekstKolonne} from '../kolonner/tekstkolonne';
import {useTolkbehovSelector} from '../../../hooks/redux/use-tolkbehovspraak-selector';
import {DataCellMedInnholdBasertPaFiltervalgProps} from './DataCellProps';

export const TolkesprakData = ({bruker, valgteKolonner, filtervalg}: DataCellMedInnholdBasertPaFiltervalgProps) => {
    const tolkbehovSpraakData = useTolkbehovSelector();

    return (
        <TekstKolonne
            tekst={tolkBehovSpraak(filtervalg, bruker, tolkbehovSpraakData)}
            skalVises={valgteKolonner.includes(Kolonne.TOLKESPRAK)}
            className="col col-xs-2"
        />
    );
};
