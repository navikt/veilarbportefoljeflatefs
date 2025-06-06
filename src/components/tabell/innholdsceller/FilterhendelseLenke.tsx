import {Kolonne} from '../../../ducks/ui/listevisning';
import {InnholdscelleMedLenkeProps} from './InnholdscelleProps';
import {LenkeKolonne} from '../kolonner/lenkekolonne';

export const FilterhendelseLenke = ({bruker, valgteKolonner, enhetId}: InnholdscelleMedLenkeProps) => (
    <LenkeKolonne
        skalVises={valgteKolonner.includes(Kolonne.FILTERHENDELSE_LENKE)}
        bruker={bruker}
        lenke={bruker.utgattVarsel?.lenke ?? ''}
        lenketekst={bruker.utgattVarsel?.beskrivelse ?? ''}
        erAbsoluttLenke={true}
        enhetId={enhetId}
        className="col col-xs-2-5"
    />
);
