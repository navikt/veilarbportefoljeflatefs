import {InnholdscelleProps} from './InnholdscelleProps';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {DatoKolonne} from '../kolonner/datokolonne';

export const AapKelvinVedtakTilOgMedDato = ({bruker, valgteKolonner}: InnholdscelleProps) => {
    const tilOgMedVedtaksdato = bruker.aapKelvinTomVedtaksdato ? new Date(bruker.aapKelvinTomVedtaksdato) : null;

    return (
        <DatoKolonne
            dato={tilOgMedVedtaksdato}
            skalVises={valgteKolonner.includes(Kolonne.AAP_KELVIN_TOM_VEDTAKSDATO)}
            className="col col-xs-2"
        />
    );
};
