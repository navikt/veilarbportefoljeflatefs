import {Kolonne} from '../../../ducks/ui/listevisning';
import {DataCellProps} from './DataCellProps';
import {DatoDataCellType} from '../dataCellTypes/DatoDataCellType';

export const UtdanningOgSituasjonSistEndretData = ({bruker, valgteKolonner}: DataCellProps) => {
    const brukersUtdanningOgSituasjonSistEndret = bruker.utdanningOgSituasjonSistEndret
        ? new Date(bruker.utdanningOgSituasjonSistEndret)
        : null;

    return (
        <DatoDataCellType
            dato={brukersUtdanningOgSituasjonSistEndret}
            skalVises={valgteKolonner.includes(Kolonne.UTDANNING_OG_SITUASJON_SIST_ENDRET)}
            className="col col-xs-2"
        />
    );
};
