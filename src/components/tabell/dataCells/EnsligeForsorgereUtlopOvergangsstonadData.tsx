import {Kolonne} from '../../../ducks/ui/listevisning';
import {DataCellProps} from './DataCellProps';
import {DatoKolonne} from '../dataCellTypes/datokolonne';

export const EnsligeForsorgereUtlopOvergangsstonadData = ({bruker, valgteKolonner}: DataCellProps) => {
    const overgangsstonadUtlopsdato = bruker.ensligeForsorgereOvergangsstonad?.utlopsDato
        ? new Date(bruker.ensligeForsorgereOvergangsstonad?.utlopsDato)
        : null;

    return (
        <DatoKolonne
            dato={overgangsstonadUtlopsdato}
            skalVises={valgteKolonner.includes(Kolonne.ENSLIGE_FORSORGERE_UTLOP_OVERGANGSSTONAD)}
            className="col col-xs-2"
        />
    );
};
