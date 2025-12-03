import {SorteringsrekkefolgeVeilederoversikt, VeilederoversiktSorteringsfelt} from '../ducks/sortering';

type Sorteringsfunksjon = <T>(a: T, b: T) => number;

const norskStringSortering = (sorteringsfelt: VeilederoversiktSorteringsfelt): Sorteringsfunksjon => {
    return <T>(a: T, b: T): number => {
        return a[sorteringsfelt].localeCompare(b[sorteringsfelt]);
    };
};

const annetSortering = (sorteringsfelt: VeilederoversiktSorteringsfelt): Sorteringsfunksjon => {
    return <T>(a: T, b: T): number => {
        return a[sorteringsfelt] - b[sorteringsfelt];
    };
};

export function sorterVeilederoversikt(
    sorteringsfelt: VeilederoversiktSorteringsfelt,
    retning: SorteringsrekkefolgeVeilederoversikt
): Sorteringsfunksjon {
    const retningsBias = retning === SorteringsrekkefolgeVeilederoversikt.SYNKENDE ? -1 : 1;
    let sorteringsfunksjon: Sorteringsfunksjon;

    return (a, b) => {
        if (sorteringsfunksjon === undefined) {
            const aVal = a[sorteringsfelt];

            if (typeof aVal === 'string') {
                sorteringsfunksjon = norskStringSortering(sorteringsfelt);
            } else {
                sorteringsfunksjon = annetSortering(sorteringsfelt);
            }
        }

        return retningsBias * sorteringsfunksjon(a, b);
    };
}
