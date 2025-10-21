import {DataCellProps} from '../DataCellProps';
import {DatoKolonne} from '../../kolonner/datokolonne';
import {Kolonne} from '../../../../ducks/ui/listevisning';

export const HuskelappSistEndretData = ({bruker, valgteKolonner}: DataCellProps) => {
    const huskelappSistEndret = bruker.huskelapp?.endretDato ? new Date(bruker.huskelapp.endretDato) : null;

    return (
        <DatoKolonne
            dato={huskelappSistEndret}
            skalVises={valgteKolonner.includes(Kolonne.HUSKELAPP_SIST_ENDRET)}
            className="col col-xs-2"
        />
    );
};
