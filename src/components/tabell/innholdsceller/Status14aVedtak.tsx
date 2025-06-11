import {Kolonne} from '../../../ducks/ui/listevisning';
import {TekstKolonne} from '../kolonner/tekstkolonne';
import {InnholdscelleProps} from './InnholdscelleProps';
import {avvik14aVedtakAvhengigeFilter} from '../../../filtrering/filter-konstanter';

export const Status14aVedtak = ({bruker, valgteKolonner}: InnholdscelleProps) => (
    <TekstKolonne
        tekst={
            avvik14aVedtakAvhengigeFilter.hasOwnProperty(bruker.avvik14aVedtak)
                ? avvik14aVedtakAvhengigeFilter[bruker.avvik14aVedtak].label
                : '-'
        }
        skalVises={valgteKolonner.includes(Kolonne.AVVIK_14A_VEDTAK)}
        className="col col-xs-2"
    />
);
