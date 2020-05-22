import { uniq } from 'lodash';

const comparator = (a, b) => {
    if (a[0] < b[0]) return -1;
    if (a[0] > b[0]) return 1;
    return 0;
}

export const transformHistoryResponse = (data) => {
    if (data) {
        const unique = uniq(data.filter((row) => {
            return row.Scantype === 'Voltage L N avg'
        }).map((row) => {
            return [row.timestamp, row.readingvalue];
        }));
        //return unique.sort(comparator).slice(0, 999);
        return unique.sort(comparator);
    }
    return [];
}
