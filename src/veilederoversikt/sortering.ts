import {SorteringsrekkefolgeVeilederoversikt, VeilederoversiktSorteringsfelt} from '../ducks/sortering';
import {VeilederMedPortefoljestorrelse} from './veilederoversikt-sidevisning';

type Sorteringsfunksjon = (a: VeilederMedPortefoljestorrelse, b: VeilederMedPortefoljestorrelse) => number;

export function sorterVeilederoversikt(
    sorteringsfelt: VeilederoversiktSorteringsfelt,
    retning: SorteringsrekkefolgeVeilederoversikt
): Sorteringsfunksjon {
    const retningsBias = retning === SorteringsrekkefolgeVeilederoversikt.SYNKENDE ? -1 : 1;

    if (sorteringsfelt === VeilederoversiktSorteringsfelt.ETTERNAVN) {
        return (a, b): number => {
            return a.etternavn.localeCompare(b.etternavn) * retningsBias;
        };
    } else if (sorteringsfelt === VeilederoversiktSorteringsfelt.PORTEFOLJESTORRELSE) {
        return (a, b): number => {
            return a.portefoljestorrelse - b.portefoljestorrelse * retningsBias;
        };
    } else {
        throw Error(
            `Not implemented yet: Det manglar sorteringsfunksjon i veilederoversikt for sorteringsfelt "${sorteringsfelt}"`
        );
    }
}
