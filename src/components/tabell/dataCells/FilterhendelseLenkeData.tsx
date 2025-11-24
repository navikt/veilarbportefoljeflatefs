import {Kolonne} from '../../../ducks/ui/listevisning';
import {LenkeDataCellType} from '../dataCellTypes/LenkeDataCellType';
import {DataCellMedLenkeProps} from './DataCellProps';

export const FilterhendelseLenkeData = ({bruker, valgteKolonner, enhetId}: DataCellMedLenkeProps) => (
    <LenkeDataCellType
        bruker={bruker}
        lenke={bruker.hendelse?.lenke ?? ''}
        lenketekst={bruker.hendelse?.beskrivelse ?? ''}
        erAbsoluttLenke={true}
        enhetId={enhetId}
        skalVises={valgteKolonner.includes(Kolonne.FILTERHENDELSE_LENKE)}
        className="col col-xs-2-5"
    />
);
