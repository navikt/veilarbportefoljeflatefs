import {Kolonne} from '../../../ducks/ui/listevisning';
import {TekstKolonne} from '../kolonner/tekstkolonne';
import {InnholdscelleProps} from './InnholdscelleProps';

export const Utkast14aVedtaksstatus = ({bruker, valgteKolonner}: InnholdscelleProps) => (
    <TekstKolonne
        tekst={bruker.utkast14a?.status ?? '-'}
        skalVises={valgteKolonner.includes(Kolonne.VEDTAKSTATUS)}
        className="col col-xs-2"
    />
);
