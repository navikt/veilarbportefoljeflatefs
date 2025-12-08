import {SorteringsrekkefolgeVeilederoversikt, VeilederoversiktSorteringsfelt} from '../ducks/sortering';
import {VeilederMedPortefoljestorrelse} from './veilederoversikt-sidevisning';

type Sorteringsfunksjon = (a: VeilederMedPortefoljestorrelse, b: VeilederMedPortefoljestorrelse) => number;

export function sorterVeilederoversikt(
    sorteringsfelt: VeilederoversiktSorteringsfelt,
    retning: SorteringsrekkefolgeVeilederoversikt
): Sorteringsfunksjon {
    const retningsBias = retning === SorteringsrekkefolgeVeilederoversikt.SYNKENDE ? -1 : 1;
    let sorteringsfunksjon: Sorteringsfunksjon;

    if (sorteringsfelt === VeilederoversiktSorteringsfelt.ETTERNAVN) {
        sorteringsfunksjon = (a, b): number => {
            return a.etternavn.localeCompare(b.etternavn);
        };
    } else if (sorteringsfelt === VeilederoversiktSorteringsfelt.PORTEFOLJESTORRELSE) {
        sorteringsfunksjon = (a, b): number => {
            return a.portefoljestorrelse - b.portefoljestorrelse;
        };
    }
    return (a, b) => retningsBias * sorteringsfunksjon(a, b);
}
