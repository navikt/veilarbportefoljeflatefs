import {Kolonne} from '../../../ducks/ui/listevisning';
import {InnholdscelleProps} from './InnholdscelleProps';
import {DatoKolonne} from '../kolonner/datokolonne';

export const SisteEndringDato = ({bruker, valgteKolonner}: InnholdscelleProps) => {
    const sisteEndringTidspunkt = bruker.sisteEndringTidspunkt ? new Date(bruker.sisteEndringTidspunkt) : null;

    return (
        <DatoKolonne
            className="col col-xs-2"
            dato={sisteEndringTidspunkt}
            skalVises={valgteKolonner.includes(Kolonne.SISTE_ENDRING_DATO)}
        />
    );
};
