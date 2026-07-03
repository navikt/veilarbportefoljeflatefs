import {Kolonne} from '../../../ducks/ui/valgte-kolonner';
import {TekstDataCellType} from '../dataCellTypes/TekstDataCellType';
import {DataCellProps} from './DataCellProps';
import {formaterDato} from '../../../utils/dato-utils';

export const GeografiskBostedSistOppdatertData = ({bruker, valgteKolonner}: DataCellProps) => {
    const formatertDato = formaterDato(bruker.geografiskBosted.bostedSistOppdatert);

    return (
        <TekstDataCellType
            tekst={formatertDato ? formatertDato : '-'}
            skalVises={valgteKolonner.includes(Kolonne.BOSTED_SIST_OPPDATERT)}
            className="col col-xs-2"
        />
    );
};
