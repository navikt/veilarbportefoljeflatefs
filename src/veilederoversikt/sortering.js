export const RETNING = {
    STIGENDE: 'ascending',
    SYNKENDE: 'decending',
    NA: 'none'
};

const norskStringSort = prop => (a, b) => a[prop].localeCompare(b[prop]);
const annetSort = prop => (a, b) => a[prop] - b[prop];

export function sorter(property, direction) {
    const directionBias = direction === RETNING.SYNKENDE ? -1 : 1;
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
