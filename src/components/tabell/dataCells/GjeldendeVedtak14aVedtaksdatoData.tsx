import {Kolonne} from '../../../ducks/ui/valgte-kolonner';
import {TekstDataCellType} from '../dataCellTypes/TekstDataCellType';
import {DataCellProps} from './DataCellProps';
import {fomraterTilNorskDateString} from '../../../utils/dato-utils';

export const GjeldendeVedtak14aVedtaksdatoData = ({bruker, valgteKolonner}: DataCellProps) => {
    const formatertDato = fomraterTilNorskDateString(bruker.vedtak14a.gjeldendeVedtak14a?.fattetDato);

    return (
        <TekstDataCellType
            tekst={formatertDato ? formatertDato : '-'}
            skalVises={valgteKolonner.includes(Kolonne.GJELDENDE_VEDTAK_14A_VEDTAKSDATO)}
            className="col col-xs-2-5"
        />
    );
};
