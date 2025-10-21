import {Kolonne} from '../../../ducks/ui/listevisning';
import {DataCellProps} from './DataCellProps';
import {DatoDataCellType} from '../dataCellTypes/DatoDataCellType';

export const SisteEndringDatoData = ({bruker, valgteKolonner}: DataCellProps) => {
    const sisteEndringTidspunkt = bruker.sisteEndringTidspunkt ? new Date(bruker.sisteEndringTidspunkt) : null;

    return (
        <DatoDataCellType
            dato={sisteEndringTidspunkt}
            skalVises={valgteKolonner.includes(Kolonne.SISTE_ENDRING_DATO)}
            className="col col-xs-2"
        />
    );
};
