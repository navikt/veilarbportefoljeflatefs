import {tolkBehovSpraak} from '../../../utils/utils';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {TekstKolonne} from '../kolonner/tekstkolonne';
import {useTolkbehovSelector} from '../../../hooks/redux/use-tolkbehovspraak-selector';
import {InnholdscelleMedDataBasertPaFiltervalgProps} from './InnholdscelleProps';

export const Tolkesprak = ({bruker, valgteKolonner, filtervalg}: InnholdscelleMedDataBasertPaFiltervalgProps) => {
    const tolkbehovSpraakData = useTolkbehovSelector();

    return (
        <TekstKolonne
            tekst={tolkBehovSpraak(filtervalg, bruker, tolkbehovSpraakData)}
            skalVises={valgteKolonner.includes(Kolonne.TOLKESPRAK)}
            className="col col-xs-2"
        />
    );
};
