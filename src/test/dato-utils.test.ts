import {formaterVarighetSomTimerOgMinutt, klokkeslettTilMinutter, minuttDifferanse} from '../utils/dato-utils';

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

        it('skal formattere varighet rett som timer og minutt', () => {
            const bareMinutt = 15;
            const forventetTekstBareMinutt = '15min';
            expect(formaterVarighetSomTimerOgMinutt(bareMinutt)).toBe(forventetTekstBareMinutt);

            const helTime = 60;
            const forventetTekstHelTime = '1t';
            expect(formaterVarighetSomTimerOgMinutt(helTime)).toBe(forventetTekstHelTime);

            const timeOgMinutt = 75;
            const forventetTekstTimeOgMinutt = '1t 15min';
            expect(formaterVarighetSomTimerOgMinutt(timeOgMinutt)).toBe(forventetTekstTimeOgMinutt);
        });
    });
});
