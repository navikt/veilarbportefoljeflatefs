import {DataCellProps} from './DataCellProps';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {DatoDataCellType} from '../dataCellTypes/DatoDataCellType';

export const AapKelvinVedtakTilOgMedDatoData = ({bruker, valgteKolonner}: DataCellProps) => {
    const tilOgMedVedtaksdato = bruker.aapKelvin?.vedtaksdatoTilOgMed
        ? new Date(bruker.aapKelvin.vedtaksdatoTilOgMed)
        : null;

    return (
        <DatoDataCellType
            dato={tilOgMedVedtaksdato}
            skalVises={valgteKolonner.includes(Kolonne.AAP_KELVIN_TOM_VEDTAKSDATO)}
            className="col col-xs-2"
        />
    );
};
