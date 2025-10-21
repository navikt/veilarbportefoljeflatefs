import {DataCellProps} from './DataCellProps';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {DatoKolonne} from '../dataCellTypes/datokolonne';

export const AapKelvinVedtakTilOgMedDatoData = ({bruker, valgteKolonner}: DataCellProps) => {
    const tilOgMedVedtaksdato = bruker.aapKelvin?.vedtaksdatoTilOgMed
        ? new Date(bruker.aapKelvin.vedtaksdatoTilOgMed)
        : null;

    return (
        <DatoKolonne
            dato={tilOgMedVedtaksdato}
            skalVises={valgteKolonner.includes(Kolonne.AAP_KELVIN_TOM_VEDTAKSDATO)}
            className="col col-xs-2"
        />
    );
};
