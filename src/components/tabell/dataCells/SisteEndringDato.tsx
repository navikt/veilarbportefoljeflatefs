import {Kolonne} from '../../../ducks/ui/listevisning';
import {DataCellProps} from './DataCellProps';
import {DatoKolonne} from '../kolonner/datokolonne';

export const SisteEndringDato = ({bruker, valgteKolonner}: DataCellProps) => {
    const sisteEndringTidspunkt = bruker.sisteEndringTidspunkt ? new Date(bruker.sisteEndringTidspunkt) : null;

    return (
        <DatoKolonne
            dato={sisteEndringTidspunkt}
            skalVises={valgteKolonner.includes(Kolonne.SISTE_ENDRING_DATO)}
            className="col col-xs-2"
        />
    );
};
