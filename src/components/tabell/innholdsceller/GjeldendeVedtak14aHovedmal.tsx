import {Kolonne} from '../../../ducks/ui/listevisning';
import {TekstKolonne} from '../kolonner/tekstkolonne';
import {InnholdscelleProps} from './InnholdscelleProps';
import {HovedmalNavn} from '../../../model-interfaces';

export const GjeldendeVedtak14aHovedmal = ({bruker, valgteKolonner}: InnholdscelleProps) => (
    <TekstKolonne
        skalVises={valgteKolonner.includes(Kolonne.GJELDENDE_VEDTAK_14A_HOVEDMAL)}
        tekst={bruker.gjeldendeVedtak14a?.hovedmal ? HovedmalNavn[bruker.gjeldendeVedtak14a.hovedmal] : '-'}
        className="col col-xs-2"
    />
);
