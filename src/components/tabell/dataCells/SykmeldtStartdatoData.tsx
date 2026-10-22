import {DataCellProps} from './DataCellProps';
import {Kolonne} from '../../../ducks/ui/valgte-kolonner';
import {DatoDataCellType} from '../dataCellTypes/DatoDataCellType';

export const SykmeldtStartdatoData = ({bruker, valgteKolonner}: DataCellProps) => (
    <DatoDataCellType
        dato={bruker.sykmeldt?.startdato ?? null}
        skalVises={valgteKolonner.includes(Kolonne.SYKMELDT_STARTDATO)}
        className="col col-xs-2"
    />
);
