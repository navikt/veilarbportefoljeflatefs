import {tolkBehovSpraak} from '../../../utils/utils';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {TekstKolonne} from '../kolonner/tekstkolonne';
import {TolkebehovProps} from './Tolkebehov';
import {useTolkbehovSelector} from '../../../hooks/redux/use-tolkbehovspraak-selector';

export const Tolkesprak = ({bruker, valgteKolonner, filtervalg}: TolkebehovProps) => {
    const tolkbehovSpraakData = useTolkbehovSelector();

    return (
        <TekstKolonne
            className="col col-xs-2"
            tekst={tolkBehovSpraak(filtervalg, bruker, tolkbehovSpraakData)}
            skalVises={valgteKolonner.includes(Kolonne.TOLKESPRAK)}
        />
    );
};
