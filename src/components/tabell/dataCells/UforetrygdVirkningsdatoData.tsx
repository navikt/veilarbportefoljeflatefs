import {DataCellProps} from './DataCellProps';
import {Kolonne} from '../../../ducks/ui/valgte-kolonner';
import {DatoDataCellType} from '../dataCellTypes/DatoDataCellType';

export const UforetrygdVirkningsdatoData = ({bruker, valgteKolonner}: DataCellProps) => {
    const virkningsdato = bruker.ytelser.uforetrygd?.virkningsdato ? bruker.ytelser.uforetrygd.virkningsdato : null;

    return (
        <DatoDataCellType
            dato={virkningsdato}
            skalVises={valgteKolonner.includes(Kolonne.UFORETRYGD_VIRKNINGSDATO)}
            className="col col-xs-2"
        />
    );
};
