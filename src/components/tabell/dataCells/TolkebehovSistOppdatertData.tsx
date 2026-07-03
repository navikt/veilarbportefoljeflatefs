import {Kolonne} from '../../../ducks/ui/valgte-kolonner';
import {TekstDataCellType} from '../dataCellTypes/TekstDataCellType';
import {DataCellProps} from './DataCellProps';
import {formaterDato} from '../../../utils/dato-utils';

export const TolkebehovSistOppdatertData = ({bruker, valgteKolonner}: DataCellProps) => {
    const formatertDato = formaterDato(bruker.tolkebehov.sistOppdatert);

    return (
        <TekstDataCellType
            tekst={formatertDato ? formatertDato : '-'}
            skalVises={valgteKolonner.includes(Kolonne.TOLKEBEHOV_SIST_OPPDATERT)}
            className="col col-xs-2"
        />
    );
};
