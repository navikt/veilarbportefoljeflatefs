import {Kolonne} from '../../../ducks/ui/listevisning';
import {InnholdscelleProps} from './InnholdscelleProps';
import {DatoKolonne} from '../kolonner/datokolonne';

export const EnsligeForsorgereUtlopOvergangsstonad = ({bruker, valgteKolonner}: InnholdscelleProps) => {
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
