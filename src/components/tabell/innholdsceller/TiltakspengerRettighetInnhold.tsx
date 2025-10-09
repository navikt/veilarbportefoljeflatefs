import {InnholdscelleProps} from './InnholdscelleProps';
import {TekstKolonne} from '../kolonner/tekstkolonne';
import {Kolonne} from '../../../ducks/ui/listevisning';

export const TiltakspengerRettighetInnhold = ({bruker, valgteKolonner}: InnholdscelleProps) => {
    return (
        <TekstKolonne
            tekst={bruker.tiltakspenger?.rettighet ?? '-'}
            skalVises={valgteKolonner.includes(Kolonne.TILTAKSPENGER_RETTIGHET)}
            className="col col-xs-2"
        />
    );
};
