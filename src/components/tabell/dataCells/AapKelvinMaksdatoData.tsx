import {DataCellProps} from './DataCellProps';
import {Kolonne} from '../../../ducks/ui/valgte-kolonner';
import {DatoDataCellType} from '../dataCellTypes/DatoDataCellType';

export const AapKelvinMaksdatoData = ({bruker, valgteKolonner}: DataCellProps) => {
    const maksdato = bruker.ytelser.aap?.maksdato ? new Date(bruker.ytelser.aap.maksdato) : null;

    return (
        <DatoDataCellType
            dato={maksdato}
            skalVises={valgteKolonner.includes(Kolonne.AAP_KELVIN_MAKSDATO)}
            className="col col-xs-2"
        />
    );
};
