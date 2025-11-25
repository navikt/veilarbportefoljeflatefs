import {Kolonne} from '../../../ducks/ui/listevisning';
import {DataCellProps} from './DataCellProps';
import {DatoDataCellType} from '../dataCellTypes/DatoDataCellType';

export const FilterhendelseDatoOpprettetData = ({bruker, valgteKolonner}: DataCellProps) => {
    const dato = bruker.hendelse?.dato ? new Date(bruker.hendelse?.dato) : null;

    return (
        <DatoDataCellType
            skalVises={valgteKolonner.includes(Kolonne.FILTERHENDELSE_DATO_OPPRETTET)}
            dato={dato}
            className="col col-xs-2"
        />
    );
};
