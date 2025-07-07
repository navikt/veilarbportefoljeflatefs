import {Kolonne} from '../../../ducks/ui/listevisning';
import {TekstKolonne} from '../kolonner/tekstkolonne';
import {InnholdscelleProps} from './InnholdscelleProps';
import {HovedmalNavn} from '../../../model-interfaces';

export const GjeldendeVedtak14aHovedmal = ({bruker, valgteKolonner}: InnholdscelleProps) => (
    <TekstKolonne
        tekst={bruker.gjeldendeVedtak14a?.hovedmal ? HovedmalNavn[bruker.gjeldendeVedtak14a.hovedmal] : '-'}
        skalVises={valgteKolonner.includes(Kolonne.GJELDENDE_VEDTAK_14A_HOVEDMAL)}
        className="col col-xs-2"
    />
);
