import {Kolonne} from '../../../ducks/ui/listevisning';
import {DataCellProps} from './DataCellProps';
import {DatoKolonne} from '../kolonner/datokolonne';

export const UtlopteAktiviteterData = ({bruker, valgteKolonner}: DataCellProps) => {
    const nyesteUtlopteAktivitet = bruker.nyesteUtlopteAktivitet ? new Date(bruker.nyesteUtlopteAktivitet) : null;

    return (
        <DatoKolonne
            dato={nyesteUtlopteAktivitet}
            skalVises={valgteKolonner.includes(Kolonne.UTLOPTE_AKTIVITETER)}
            className="col col-xs-2"
        />
    );
};
