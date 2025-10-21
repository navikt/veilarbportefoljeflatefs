import {DataCellProps} from './DataCellProps';
import {TekstKolonne} from '../dataCellTypes/tekstkolonne';
import {Kolonne} from '../../../ducks/ui/listevisning';

export const TiltakspengerRettighetData = ({bruker, valgteKolonner}: DataCellProps) => (
    <TekstKolonne
        tekst={bruker.tiltakspenger?.rettighet ?? '-'}
        skalVises={valgteKolonner.includes(Kolonne.TILTAKSPENGER_RETTIGHET)}
        className="col col-xs-2"
    />
);
