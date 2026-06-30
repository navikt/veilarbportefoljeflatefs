import {Kolonne} from '../../../ducks/ui/valgte-kolonner';
import {TekstDataCellType} from '../dataCellTypes/TekstDataCellType';
import {DataCellProps} from './DataCellProps';
import {toDateString} from '../../../utils/dato-utils';

export const GeografiskBostedSistOppdatertData = ({bruker, valgteKolonner}: DataCellProps) => (
    <TekstDataCellType
        tekst={
            bruker.geografiskBosted.bostedSistOppdatert
                ? toDateString(bruker.geografiskBosted.bostedSistOppdatert)
                : '-'
        }
        skalVises={valgteKolonner.includes(Kolonne.BOSTED_SIST_OPPDATERT)}
        className="col col-xs-2"
    />
);
