export enum DIRECTION {
    ASC = 'ascending',
    DESC = 'descending',
    NA = 'na'
}

const norskStringSort = (prop: string) => (a, b) => a[prop].localeCompare(b[prop], 'no-bok', { sensitivity: 'accent' });
const annetSort = (prop: string) => (a, b) => a[prop] - b[prop];

export function sorter(property: string, direction: string) {
    const directionBias = direction === DIRECTION.DESC ? -1 : 1;
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
