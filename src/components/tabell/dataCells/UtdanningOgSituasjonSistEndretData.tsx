import {Kolonne} from '../../../ducks/ui/valgte-kolonner';
import {DataCellProps} from './DataCellProps';
import {DatoDataCellType} from '../dataCellTypes/DatoDataCellType';

export const UtdanningOgSituasjonSistEndretData = ({bruker, valgteKolonner}: DataCellProps) => {
    return (
        <DatoDataCellType
            dato={bruker.arbeidssoekerregisteret?.utdanningOgSituasjonSistEndret}
            skalVises={valgteKolonner.includes(Kolonne.UTDANNING_OG_SITUASJON_SIST_ENDRET)}
            className="col col-xs-2"
        />
    );
};
