import {DataCellProps} from './DataCellProps';
import {Kolonne} from '../../../ducks/ui/valgte-kolonner';
import {DatoDataCellType} from '../dataCellTypes/DatoDataCellType';

export const SykmeldtSluttdatoData = ({bruker, valgteKolonner}: DataCellProps) => (
    <DatoDataCellType
        dato={bruker.sykmeldt?.sluttdato ?? null}
        skalVises={valgteKolonner.includes(Kolonne.SYKMELDT_SLUTTDATO)}
        className="col col-xs-2"
    />
);
