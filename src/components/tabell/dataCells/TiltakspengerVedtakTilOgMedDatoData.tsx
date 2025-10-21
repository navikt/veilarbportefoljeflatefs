import {DataCellProps} from './DataCellProps';
import {DatoKolonne} from '../dataCellTypes/datokolonne';
import {Kolonne} from '../../../ducks/ui/listevisning';

export const TiltakspengerVedtakTilOgMedDatoData = ({bruker, valgteKolonner}: DataCellProps) => {
    const tilOgMedVedtaksdato = bruker.tiltakspenger?.vedtaksdatoTilOgMed
        ? new Date(bruker.tiltakspenger.vedtaksdatoTilOgMed)
        : null;

    return (
        <DatoKolonne
            dato={tilOgMedVedtaksdato}
            skalVises={valgteKolonner.includes(Kolonne.TILTAKSPENGER_VEDTAKSDATO_TOM)}
            className="col col-xs-2"
        />
    );
};
