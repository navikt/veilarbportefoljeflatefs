import {DataCellProps} from './DataCellProps';
import {DatoDataCellType} from '../dataCellTypes/DatoDataCellType';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {TekstDataCellType} from '../dataCellTypes/TekstDataCellType';

export const DagpengerStansDatoData = ({bruker, valgteKolonner}: DataCellProps) => {
    const tilOgMedVedtaksdato = bruker.ytelser.dagpenger?.datoPlanlagtStans
        ? new Date(bruker.ytelser.dagpenger?.datoPlanlagtStans)
        : null;

    return (
        <>
            {tilOgMedVedtaksdato ? (
                <DatoDataCellType
                    dato={tilOgMedVedtaksdato}
                    skalVises={valgteKolonner.includes(Kolonne.DAGPENGER_PLANGLAGT_STANS)}
                    className="col col-xs-2"
                />
            ) : (
                <TekstDataCellType
                    tekst={'Løpende'}
                    skalVises={valgteKolonner.includes(Kolonne.DAGPENGER_PLANGLAGT_STANS)}
                    className="col col-xs-2"
                />
            )}
        </>
    );
};
