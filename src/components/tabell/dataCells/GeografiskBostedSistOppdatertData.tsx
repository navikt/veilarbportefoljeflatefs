import {Kolonne} from '../../../ducks/ui/listevisning';
import {TekstKolonne} from '../dataCellTypes/tekstkolonne';
import {DataCellProps} from './DataCellProps';
import {toDateString} from '../../../utils/dato-utils';

export const GeografiskBostedSistOppdatertData = ({bruker, valgteKolonner}: DataCellProps) => (
    <TekstKolonne
        tekst={bruker.bostedSistOppdatert ? toDateString(bruker.bostedSistOppdatert) : '-'}
        skalVises={valgteKolonner.includes(Kolonne.BOSTED_SIST_OPPDATERT)}
        className="col col-xs-2"
    />
);
