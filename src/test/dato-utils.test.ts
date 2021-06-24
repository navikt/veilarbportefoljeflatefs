import {klokkeslettTilMinutter, minuttDifferanse} from '../utils/dato-utils';

describe('dato utils test', () => {
    describe('endrer alt til minutter dersom tidskolonne skal kunne være mer generisk', () => {
        it('skal endre klokkeslett til minutter', () => {
            const date = new Date();
            const minutter = klokkeslettTilMinutter(date);
            const minutterDate = date.getHours() * 60 + date.getMinutes();
            expect(minutter).toBe(minutterDate);
        });

        it('skal beregne differansen mellom to klokkeslett i minutter', () => {
            const date = new Date();
            const date2 = new Date();
            date2.setMinutes(date.getMinutes() + 30);
            const minutter = minuttDifferanse(date2, date);
            expect(minutter).toBe(30);
        });
    });
});
