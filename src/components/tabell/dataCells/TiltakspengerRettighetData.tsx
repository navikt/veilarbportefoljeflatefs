import {DataCellProps} from './DataCellProps';
import {TekstDataCellType} from '../dataCellTypes/TekstDataCellType';
import {Kolonne} from '../../../ducks/ui/listevisning';

export const TiltakspengerRettighetData = ({bruker, valgteKolonner}: DataCellProps) => (
    <TekstDataCellType
        tekst={bruker.tiltakspenger?.rettighet ?? '-'}
        skalVises={valgteKolonner.includes(Kolonne.TILTAKSPENGER_RETTIGHET)}
        className="col col-xs-2"
    />
);
