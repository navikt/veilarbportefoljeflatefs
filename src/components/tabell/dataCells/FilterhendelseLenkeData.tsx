import {Kolonne} from '../../../ducks/ui/listevisning';
import {DataCellMedLenkeProps} from './DataCellProps';
import {LenkeKolonne} from '../dataCellTypes/lenkekolonne';

export const FilterhendelseLenkeData = ({bruker, valgteKolonner, enhetId}: DataCellMedLenkeProps) => (
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
