import {bostedKommuneUtlandEllerUkjent} from '../../../utils/utils';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {TekstDataCellType} from '../dataCellTypes/TekstDataCellType';
import {DataCellProps} from './DataCellProps';
import {useGeografiskbostedSelector} from '../../../hooks/redux/use-geografiskbosted-selector';

export const GeografiskBostedData = ({bruker, valgteKolonner}: DataCellProps) => {
    const geografiskbostedData = useGeografiskbostedSelector();

    return (
        <TekstDataCellType
            tekst={bostedKommuneUtlandEllerUkjent(bruker, geografiskbostedData)}
            skalVises={valgteKolonner.includes(Kolonne.BOSTED_KOMMUNE)}
            className="col col-xs-2"
        />
    );
};
