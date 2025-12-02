import {SorteringsrekkefolgeVeilederoversikt, VeilederoversiktSorteringsfelt} from '../ducks/sortering';

type Sorteringsfunksjon = <T>(a: T, b: T) => number;

const norskStringSort = (sorteringsfelt: VeilederoversiktSorteringsfelt): Sorteringsfunksjon => {
    return <T>(a: T, b: T): number => {
        return a[sorteringsfelt].localeCompare(b[sorteringsfelt]);
    };
};

const annetSort = (sorteringsfelt: VeilederoversiktSorteringsfelt): Sorteringsfunksjon => {
    return <T>(a: T, b: T): number => {
        return a[sorteringsfelt] - b[sorteringsfelt];
    };
};

export function sorter(
    property: VeilederoversiktSorteringsfelt,
    direction: SorteringsrekkefolgeVeilederoversikt
): Sorteringsfunksjon {
    const directionBias = direction === SorteringsrekkefolgeVeilederoversikt.SYNKENDE ? -1 : 1;
    let sortImpl;

    return (a, b) => {
        if (sortImpl === undefined) {
            const aVal = a[property];

            if (typeof aVal === 'string') {
                sortImpl = norskStringSort(property);
            } else {
                sortImpl = annetSort(property);
            }
        }

        return directionBias * sortImpl(a, b);
    };
}
