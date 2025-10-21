import {Kolonne} from '../../../ducks/ui/listevisning';
import {TekstKolonne} from '../dataCellTypes/tekstkolonne';
import {DataCellProps} from './DataCellProps';
import {HovedmalNavn} from '../../../model-interfaces';

export const GjeldendeVedtak14aHovedmalData = ({bruker, valgteKolonner}: DataCellProps) => (
    <TekstKolonne
        tekst={bruker.gjeldendeVedtak14a?.hovedmal ? HovedmalNavn[bruker.gjeldendeVedtak14a.hovedmal] : '-'}
        skalVises={valgteKolonner.includes(Kolonne.GJELDENDE_VEDTAK_14A_HOVEDMAL)}
        className="col col-xs-2"
    />
);
