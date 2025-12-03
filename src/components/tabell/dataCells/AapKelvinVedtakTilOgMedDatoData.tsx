import {DataCellProps} from './DataCellProps';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {DatoDataCellType} from '../dataCellTypes/DatoDataCellType';

export const AapKelvinVedtakTilOgMedDatoData = ({bruker, valgteKolonner}: DataCellProps) => {
    const tilOgMedVedtaksdato = bruker.ytelser.aap?.vedtaksdatoTilOgMed
        ? new Date(bruker.ytelser.aap.vedtaksdatoTilOgMed)
        : null;

    return (
        <DatoDataCellType
            dato={tilOgMedVedtaksdato}
            skalVises={valgteKolonner.includes(Kolonne.AAP_KELVIN_TOM_VEDTAKSDATO)}
            className="col col-xs-2"
        />
    );
};
