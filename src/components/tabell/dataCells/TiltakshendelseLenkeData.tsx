import {Kolonne} from '../../../ducks/ui/listevisning';
import {DataCellMedLenkeProps} from './DataCellProps';
import {LenkeKolonne} from '../dataCellTypes/lenkekolonne';

export const TiltakshendelseLenkeData = ({bruker, valgteKolonner, enhetId}: DataCellMedLenkeProps) => (
    <LenkeKolonne
        bruker={bruker}
        lenke={bruker.tiltakshendelse?.lenke ?? ''}
        lenketekst={bruker.tiltakshendelse?.tekst ?? ''}
        enhetId={enhetId}
        skalVises={valgteKolonner.includes(Kolonne.TILTAKSHENDELSE_LENKE)}
        className="col col-xs-3 col-break-word"
    />
);
