import {InnholdscelleProps} from '../InnholdscelleProps';
import {DatoKolonne} from '../../kolonner/datokolonne';
import {Kolonne} from '../../../../ducks/ui/listevisning';

export const Tildelingstidspunkt = ({bruker, valgteKolonner}: InnholdscelleProps) => {
    const tildelingstidspunkt = bruker.tildelingstidspunkt ? new Date(bruker.tildelingstidspunkt) : null;

    return (
        <DatoKolonne
            dato={tildelingstidspunkt}
            skalVises={valgteKolonner.includes(Kolonne.TILDELINGSDATO)}
            className="col col-xs-2"
        />
    );
};
