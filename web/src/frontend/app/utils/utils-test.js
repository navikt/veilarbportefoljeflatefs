import { expect } from 'chai';

import { filterUrlBuilder, arraysHaveEqualContent } from '../utils/utils';

describe('Utils', () => {
    describe('filterUrlBuilder', () => {
        it('skal legge til nyeBrukere i url hvis den er aktiv', () => {
            const filtervalg = { nyeBrukere: true };
            expect(filterUrlBuilder(filtervalg)).to.equal('&nyeBrukere=true');
        });

        it('skal legge til inaktiveBrukere i url hvis den er aktiv', () => {
            const filtervalg = { inaktiveBrukere: true };
            expect(filterUrlBuilder(filtervalg)).to.equal('&inaktiveBrukere=true');
        });

        it('skal legge til nyeBrukere og inaktiveBrukere i url hvis de er aktive', () => {
            const filtervalg = { inaktiveBrukere: true, nyeBrukere: true };
            expect(filterUrlBuilder(filtervalg)).to.equal('&nyeBrukere=true&inaktiveBrukere=true');
        });

        it('skal legge til alder i url hvis valgt alder er større eller lik 0', () => {
            const filtervalg = { alder: [1] };
            expect(filterUrlBuilder(filtervalg)).to.equal('&alder[]=1');
        });

        it('skal ikke legge til alder i url hvis alder er mindre enn 0', () => {
            const filtervalg = { alder: [-1] };
            expect(filterUrlBuilder(filtervalg)).to.equal('');
        });

        it('skal ikke legge til alder i url hvis alder er > 7', () => {
            const filtervalg = { alder: [9] };
            expect(filterUrlBuilder(filtervalg)).to.equal('');
        });

        it('skal legge til M kjønn i url hvis Mann er valgt', () => {
            const filtervalg = { kjonn: 'M' };
            expect(filterUrlBuilder(filtervalg)).to.equal('&kjonn=M');
        });

        it('skal legge til K kjønn i url hvis Kvinne er valgt', () => {
            const filtervalg = { kjonn: 'K' };
            expect(filterUrlBuilder(filtervalg)).to.equal('&kjonn=K');
        });

        it('skal ikke legge til kjønn i url hvis hverken Mann eller Kvinne er valgt', () => {
            let filtervalg = { kjonn: 'ikke definert' };
            expect(filterUrlBuilder(filtervalg)).to.equal('');
            filtervalg = { kjonn: 'L' };
            expect(filterUrlBuilder(filtervalg)).to.equal('');
            filtervalg = { kjonn: null };
            expect(filterUrlBuilder(filtervalg)).to.equal('');
        });

        it('skal ikke legge til filtre i url hvis det ikke finnes filtre', () => {
            const filtervalg = {};
            expect(filterUrlBuilder(filtervalg)).to.equal('');
        });
    });
    describe('arraysHaveEqualContent', () => {
        it('skal returnere true hvis begge arrayene er tomme', () => {
            expect(arraysHaveEqualContent([], [])).to.equal(true);
        });
        it('skal returnere false hvis arrayene har ulik length', () => {
            expect(arraysHaveEqualContent([1, 2, 3], [1, 2, 3, 4, 5])).to.equal(false);
            expect(arraysHaveEqualContent([], [1])).to.equal(false);
            expect(arraysHaveEqualContent([12, 7, 3], [8, 16, 32, 23, 0])).to.equal(false);
        });
        it('skal returnere false hvis arrayenes innhold er ulikt', () => {
            expect(arraysHaveEqualContent([1, 2, 3], [1, 2])).to.equal(false);
            expect(arraysHaveEqualContent([1, 2, 3], [1, 2, 4])).to.equal(false);
            expect(arraysHaveEqualContent([1, 2, 3, 4, 5], [5, 4, 3, 2, 0])).to.equal(false);
            expect(arraysHaveEqualContent([], [2])).to.equal(false);
        });
        it('skal returnere true hvis arrayened innhold er likt', () => {
            expect(arraysHaveEqualContent([1, 2, 3], [3, 1, 2])).to.equal(true);
            expect(arraysHaveEqualContent([2, 8, 54, 0, 9], [0, 9, 2, 54, 8])).to.equal(true);
            expect(arraysHaveEqualContent([10], [10])).to.equal(true);
            expect(arraysHaveEqualContent([6, 7, 8, 9], [6, 7, 8, 9])).to.equal(true);
        });
    });
});
