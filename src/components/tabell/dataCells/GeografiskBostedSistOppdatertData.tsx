import {Kolonne} from '../../../ducks/ui/listevisning';
import {TekstDataCellType} from '../dataCellTypes/TekstDataCellType';
import {DataCellProps} from './DataCellProps';
import {toDateString} from '../../../utils/dato-utils';

export const GeografiskBostedSistOppdatertData = ({bruker, valgteKolonner}: DataCellProps) => (
    <TekstDataCellType
        tekst={bruker.bostedSistOppdatert ? toDateString(bruker.bostedSistOppdatert) : '-'}
        skalVises={valgteKolonner.includes(Kolonne.BOSTED_SIST_OPPDATERT)}
        className="col col-xs-2"
    />
);
