import {Kolonne} from '../../../ducks/ui/listevisning';
import {DataCellMedLenkeProps} from './DataCellProps';
import {LenkeDataCellType} from '../dataCellTypes/LenkeDataCellType';

export const TiltakshendelseLenkeData = ({bruker, valgteKolonner, enhetId}: DataCellMedLenkeProps) => (
    <LenkeDataCellType
        bruker={bruker}
        lenke={bruker.tiltakshendelse?.lenke ?? ''}
        lenketekst={bruker.tiltakshendelse?.tekst ?? ''}
        enhetId={enhetId}
        skalVises={valgteKolonner.includes(Kolonne.TILTAKSHENDELSE_LENKE)}
        className="col col-xs-3 col-break-word"
    />
);
