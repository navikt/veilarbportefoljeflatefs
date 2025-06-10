import {Kolonne} from '../../../ducks/ui/listevisning';
import {TekstKolonne} from '../kolonner/tekstkolonne';
import {InnholdscelleProps} from './InnholdscelleProps';
import {toDateString} from '../../../utils/dato-utils';

export const GjeldendeVedtak14aVedtaksdato = ({bruker, valgteKolonner}: InnholdscelleProps) => (
    <TekstKolonne
        skalVises={valgteKolonner.includes(Kolonne.GJELDENDE_VEDTAK_14A_VEDTAKSDATO)}
        tekst={bruker.gjeldendeVedtak14a?.innsatsgruppe ? toDateString(bruker.gjeldendeVedtak14a?.fattetDato) : '-'}
        className="col col-xs-2-5"
    />
);
