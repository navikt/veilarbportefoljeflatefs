import { expect } from 'chai';

import { filterUrlBuilder, ytelseFilterErAktiv } from '../utils/utils';

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

        it('skal legge til alder i url hvis valgt alder er > 0', () => {
            const filtervalg = { alder: 1 };
            expect(filterUrlBuilder(filtervalg)).to.equal('&alder=1');
        });

        it('skal ikke legge til alder i url hvis alder er 0', () => {
            const filtervalg = { alder: 0 };
            expect(filterUrlBuilder(filtervalg)).to.equal('');
        });

        it('skal ikke legge til alder i url hvis alder er > 8', () => {
            const filtervalg = { alder: 9 };
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

        it('skal kunne avgjøre om ytelsesfilter er aktive', () => {
            const filtervalg = {
                ordinaereDagpenger: true,
                dagpengerUnderPermittering: false,
                aapMaxtid: false,
                aapUnntak: false
            };
            expect(ytelseFilterErAktiv(filtervalg)).to.equal(true);
        });
    });
});
