import {Kolonne} from '../../../ducks/ui/listevisning';
import {InnholdscelleProps} from './InnholdscelleProps';
import {DatoKolonne} from '../kolonner/datokolonne';

export const UtdanningOgSituasjonSistEndret = ({bruker, valgteKolonner}: InnholdscelleProps) => {
    const brukersUtdanningOgSituasjonSistEndret = bruker.utdanningOgSituasjonSistEndret
        ? new Date(bruker.utdanningOgSituasjonSistEndret)
        : null;

    return (
        <DatoKolonne
            dato={brukersUtdanningOgSituasjonSistEndret}
            skalVises={valgteKolonner.includes(Kolonne.UTDANNING_OG_SITUASJON_SIST_ENDRET)}
            className="col col-xs-2"
        />
    );
};
