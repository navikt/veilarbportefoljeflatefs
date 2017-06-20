export const DIRECTION = {
    ASC: 'ascending',
    DESC: 'descending',
    NA: 'na'
};

const norskStringSort = (prop) => (a, b) => a[prop].localeCompare(b[prop], 'no-bok', { sensitivity: 'accent' });
const annetSort = (prop) => (a, b) => a[prop] - b[prop];

export function sorter(property, direction) {
    const directionBias = direction === DIRECTION.DESC ? 1 : -1;
    let sortImpl = undefined;

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
