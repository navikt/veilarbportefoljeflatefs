import {Kolonne} from '../../../ducks/ui/listevisning';
import {DataCellProps} from './DataCellProps';
import {DatoDataCellType} from '../dataCellTypes/DatoDataCellType';

export const SisteEndringDatoData = ({bruker, valgteKolonner}: DataCellProps) => {
    const sisteEndringTidspunkt = bruker.sisteEndringAvBruker?.tidspunkt
        ? new Date(bruker.sisteEndringAvBruker?.tidspunkt)
        : null;

    return (
        <DatoDataCellType
            dato={sisteEndringTidspunkt}
            skalVises={valgteKolonner.includes(Kolonne.SISTE_ENDRING_DATO)}
            className="col col-xs-2"
        />
    );
};
