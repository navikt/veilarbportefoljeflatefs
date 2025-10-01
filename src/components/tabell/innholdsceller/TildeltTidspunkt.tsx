import {InnholdscelleProps} from './InnholdscelleProps';
import {DatoKolonne} from '../kolonner/datokolonne';
import {Kolonne} from '../../../ducks/ui/listevisning';

export const TildeltTidspunkt = ({bruker, valgteKolonner}: InnholdscelleProps) => {
    const tildelingstidspunkt = bruker.tildeltTidspunkt ? new Date(bruker.tildeltTidspunkt) : null;

    return (
        <DatoKolonne
            dato={tildelingstidspunkt}
            skalVises={valgteKolonner.includes(Kolonne.TILDELT_TIDSPUNKT)}
            className="col col-xs-2"
        />
    );
};
