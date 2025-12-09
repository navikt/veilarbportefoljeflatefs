import {Kolonne} from '../../../ducks/ui/listevisning';
import {TekstDataCellType} from '../dataCellTypes/TekstDataCellType';
import {DataCellProps} from './DataCellProps';
import {HovedmalNavn} from '../../../model-interfaces';

export const GjeldendeVedtak14aHovedmalData = ({bruker, valgteKolonner}: DataCellProps) => (
    <TekstDataCellType
        tekst={
            bruker.vedtak14a.gjeldendeVedtak14a?.hovedmal
                ? HovedmalNavn[bruker.vedtak14a.gjeldendeVedtak14a.hovedmal]
                : '-'
        }
        skalVises={valgteKolonner.includes(Kolonne.GJELDENDE_VEDTAK_14A_HOVEDMAL)}
        className="col col-xs-2"
    />
);
