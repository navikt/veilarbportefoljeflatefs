import {bostedBydelEllerUkjent} from '../../../utils/utils';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {TekstDataCellType} from '../dataCellTypes/TekstDataCellType';
import {DataCellProps} from './DataCellProps';
import {useGeografiskbostedSelector} from '../../../hooks/redux/use-geografiskbosted-selector';

export const GeografiskBostedDetaljerData = ({bruker, valgteKolonner}: DataCellProps) => {
    const geografiskbostedData = useGeografiskbostedSelector();

    return (
        <TekstDataCellType
            tekst={
                bruker.geografiskBosted.bostedBydel
                    ? bostedBydelEllerUkjent(bruker.geografiskBosted.bostedBydel, geografiskbostedData)
                    : '-'
            }
            skalVises={valgteKolonner.includes(Kolonne.BOSTED_BYDEL)}
            className="col col-xs-2"
        />
    );
};
