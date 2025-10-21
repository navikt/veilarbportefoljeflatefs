import {InnholdscelleProps} from './InnholdscelleProps';
import {TekstKolonne} from '../kolonner/tekstkolonne';
import {Kolonne} from '../../../ducks/ui/listevisning';

export const TiltakspengerRettighet = ({bruker, valgteKolonner}: InnholdscelleProps) => (
    <TekstKolonne
        tekst={bruker.tiltakspenger?.rettighet ?? '-'}
        skalVises={valgteKolonner.includes(Kolonne.TILTAKSPENGER_RETTIGHET)}
        className="col col-xs-2"
    />
);
