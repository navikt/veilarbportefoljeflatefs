import {Kolonne} from '../../../ducks/ui/listevisning';
import {InnholdscelleMedLenkeProps} from './InnholdscelleProps';
import {LenkeKolonne} from '../kolonner/lenkekolonne';

export const FilterhendelseLenke = ({bruker, valgteKolonner, enhetId}: InnholdscelleMedLenkeProps) => (
    <LenkeKolonne
        bruker={bruker}
        lenke={bruker.utgattVarsel?.lenke ?? ''}
        lenketekst={bruker.utgattVarsel?.beskrivelse ?? ''}
        erAbsoluttLenke={true}
        enhetId={enhetId}
        skalVises={valgteKolonner.includes(Kolonne.FILTERHENDELSE_LENKE)}
        className="col col-xs-2-5"
    />
);
