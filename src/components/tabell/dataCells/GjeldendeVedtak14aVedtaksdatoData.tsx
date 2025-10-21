import {Kolonne} from '../../../ducks/ui/listevisning';
import {TekstDataCellType} from '../dataCellTypes/TekstDataCellType';
import {DataCellProps} from './DataCellProps';
import {toDateString} from '../../../utils/dato-utils';

export const GjeldendeVedtak14aVedtaksdatoData = ({bruker, valgteKolonner}: DataCellProps) => (
    <TekstDataCellType
        tekst={bruker.gjeldendeVedtak14a?.innsatsgruppe ? toDateString(bruker.gjeldendeVedtak14a?.fattetDato) : '-'}
        skalVises={valgteKolonner.includes(Kolonne.GJELDENDE_VEDTAK_14A_VEDTAKSDATO)}
        className="col col-xs-2-5"
    />
);
