import {formaterVarighetSomTimerOgMinutt} from '../utils/dato-utils';

describe('dato utils test', () => {
    describe('omvandler allt til minutter dersom tidskolonne skall kunne vare mer generisk', () => {
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
