import {bostedBydelEllerUkjent} from '../../../utils/utils';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {TekstKolonne} from '../kolonner/tekstkolonne';
import {InnholdscelleProps} from './InnholdscelleProps';
import {useGeografiskbostedSelector} from '../../../hooks/redux/use-geografiskbosted-selector';

export const GeografiskBostedDetaljer = ({bruker, valgteKolonner}: InnholdscelleProps) => {
    const geografiskbostedData = useGeografiskbostedSelector();

    return (
        <TekstKolonne
            tekst={bruker.bostedBydel ? bostedBydelEllerUkjent(bruker.bostedBydel, geografiskbostedData) : '-'}
            skalVises={valgteKolonner.includes(Kolonne.BOSTED_BYDEL)}
            className="col col-xs-2"
        />
    );
};
