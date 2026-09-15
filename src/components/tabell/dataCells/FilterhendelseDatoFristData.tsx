import {Kolonne} from '../../../ducks/ui/valgte-kolonner';
import {DataCellProps} from './DataCellProps';
import {DatoDataCellType} from '../dataCellTypes/DatoDataCellType';

export const FilterhendelseDatoFristData = ({bruker, valgteKolonner}: DataCellProps) => {
    const dato = bruker.hendelse?.datoFrist ? bruker.hendelse?.datoFrist : null;

    return (
        <DatoDataCellType
            skalVises={valgteKolonner.includes(Kolonne.FILTERHENDELSE_DATO_FRIST)}
            dato={dato}
            className="col col-xs-2"
        />
    );
};
