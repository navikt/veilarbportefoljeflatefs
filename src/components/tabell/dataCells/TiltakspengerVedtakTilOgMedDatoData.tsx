import {DataCellProps} from './DataCellProps';
import {DatoDataCellType} from '../dataCellTypes/DatoDataCellType';
import {Kolonne} from '../../../ducks/ui/listevisning';

export const TiltakspengerVedtakTilOgMedDatoData = ({bruker, valgteKolonner}: DataCellProps) => {
    const tilOgMedVedtaksdato = bruker.ytelser.tiltakspenger?.vedtaksdatoTilOgMed
        ? new Date(bruker.ytelser.tiltakspenger.vedtaksdatoTilOgMed)
        : null;

    return (
        <DatoDataCellType
            dato={tilOgMedVedtaksdato}
            skalVises={valgteKolonner.includes(Kolonne.TILTAKSPENGER_VEDTAKSDATO_TOM)}
            className="col col-xs-2"
        />
    );
};
