import {Kolonne} from '../../../ducks/ui/listevisning';
import {DataCellProps} from './DataCellProps';
import {DatoDataCellType} from '../dataCellTypes/DatoDataCellType';

export const EnsligeForsorgereUtlopOvergangsstonadData = ({bruker, valgteKolonner}: DataCellProps) => {
    const overgangsstonadUtlopsdato = bruker.ytelser.ensligeForsorgereOvergangsstonad?.utlopsDato
        ? new Date(bruker.ytelser.ensligeForsorgereOvergangsstonad?.utlopsDato)
        : null;

    return (
        <DatoDataCellType
            dato={overgangsstonadUtlopsdato}
            skalVises={valgteKolonner.includes(Kolonne.ENSLIGE_FORSORGERE_UTLOP_OVERGANGSSTONAD)}
            className="col col-xs-2"
        />
    );
};
