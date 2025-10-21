import {Kolonne} from '../../../ducks/ui/listevisning';
import {InnholdscelleMedLenkeProps} from './InnholdscelleProps';
import {LenkeKolonne} from '../kolonner/lenkekolonne';

export const TiltakshendelseLenke = ({bruker, valgteKolonner, enhetId}: InnholdscelleMedLenkeProps) => (
    <LenkeKolonne
        bruker={bruker}
        lenke={bruker.tiltakshendelse?.lenke ?? ''}
        lenketekst={bruker.tiltakshendelse?.tekst ?? ''}
        enhetId={enhetId}
        skalVises={valgteKolonner.includes(Kolonne.TILTAKSHENDELSE_LENKE)}
        className="col col-xs-3 col-break-word"
    />
);
