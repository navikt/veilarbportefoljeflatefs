import {DataCellProps} from './DataCellProps';
import {DatoDataCellType} from '../dataCellTypes/DatoDataCellType';
import {Kolonne} from '../../../ducks/ui/listevisning';

export const TildeltTidspunktData = ({bruker, valgteKolonner}: DataCellProps) => {
    const tildelingstidspunkt = bruker.tildeltTidspunkt ? new Date(bruker.tildeltTidspunkt) : null;

    return (
        <DatoDataCellType
            dato={tildelingstidspunkt}
            skalVises={valgteKolonner.includes(Kolonne.TILDELT_TIDSPUNKT)}
            className="col col-xs-2"
        />
    );
};
