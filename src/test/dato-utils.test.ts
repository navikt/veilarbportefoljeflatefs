import { klokkeslettTilMinutter, minuttDifferanse } from '../utils/dato-utils';

describe('dato utils test', () => {
    describe('omvandler allt til minutter dersom tidskolonne skall kunne vare mer generisk', () => {
        it('skall omvandle klokkeslett til minutter', () => {
            const date = new Date();
            const minutter = klokkeslettTilMinutter(date);
            const minutterDate = date.getHours() * 60 + date.getMinutes();
            expect(minutter).toBe(minutterDate);
        });

        it('skall bereigne differransen mellom to klokkeslett i minutter', () => {
            const date = new Date();
            const date2 = new Date();
            date2.setMinutes(date.getMinutes() + 30);
            const minutter = minuttDifferanse(date2, date);
            expect(minutter).toBe(30);
        });
    });
});
