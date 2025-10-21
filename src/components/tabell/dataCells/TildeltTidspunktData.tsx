import {DataCellProps} from './DataCellProps';
import {DatoKolonne} from '../dataCellTypes/datokolonne';
import {Kolonne} from '../../../ducks/ui/listevisning';

export const TildeltTidspunktData = ({bruker, valgteKolonner}: DataCellProps) => {
    const tildelingstidspunkt = bruker.tildeltTidspunkt ? new Date(bruker.tildeltTidspunkt) : null;

    return (
        <DatoKolonne
            dato={tildelingstidspunkt}
            skalVises={valgteKolonner.includes(Kolonne.TILDELT_TIDSPUNKT)}
            className="col col-xs-2"
        />
    );
};
