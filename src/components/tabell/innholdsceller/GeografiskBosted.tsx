import {bostedKommuneUtlandEllerUkjent} from '../../../utils/utils';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {TekstKolonne} from '../kolonner/tekstkolonne';
import {InnholdscelleProps} from './InnholdscelleProps';
import {useGeografiskbostedSelector} from '../../../hooks/redux/use-geografiskbosted-selector';

export const GeografiskBosted = ({bruker, valgteKolonner}: InnholdscelleProps) => {
    const geografiskbostedData = useGeografiskbostedSelector();

    return (
        <TekstKolonne
            tekst={bostedKommuneUtlandEllerUkjent(bruker, geografiskbostedData)}
            skalVises={valgteKolonner.includes(Kolonne.BOSTED_KOMMUNE)}
            className="col col-xs-2"
        />
    );
};
