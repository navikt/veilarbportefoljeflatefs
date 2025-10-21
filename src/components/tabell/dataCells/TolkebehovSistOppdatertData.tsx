import {Kolonne} from '../../../ducks/ui/listevisning';
import {TekstKolonne} from '../dataCellTypes/tekstkolonne';
import {DataCellProps} from './DataCellProps';
import {toDateString} from '../../../utils/dato-utils';

export const TolkebehovSistOppdatertData = ({bruker, valgteKolonner}: DataCellProps) => (
    <TekstKolonne
        tekst={bruker.tolkebehov.sistOppdatert ? toDateString(bruker.tolkebehov.sistOppdatert) : '-'}
        skalVises={valgteKolonner.includes(Kolonne.TOLKEBEHOV_SIST_OPPDATERT)}
        className="col col-xs-2"
    />
);
