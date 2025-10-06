import {tolkBehov} from '../../../utils/utils';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {TekstKolonne} from '../kolonner/tekstkolonne';
import {InnholdscelleMedDataBasertPaFiltervalgProps} from './InnholdscelleProps';

export const Tolkebehov = ({bruker, valgteKolonner, filtervalg}: InnholdscelleMedDataBasertPaFiltervalgProps) => (
    <TekstKolonne
        tekst={tolkBehov(filtervalg, bruker)}
        skalVises={valgteKolonner.includes(Kolonne.TOLKEBEHOV)}
        className="col col-xs-2"
    />
);
