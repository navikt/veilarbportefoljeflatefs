import { expect } from 'chai';
import { ASCENDING, DESCENDING } from '../konstanter';

import { til, compareEtternavn, comparePortefoljestorrelser,
    sorterPaaEtternavn, sorterPaaPortefoljestorrelse } from './veilederpaginering';

describe('VeilederPagineringReducer', () => {
    it('finner riktig til-indeks når subliste skal genereres', () => {
        expect(til(0, 20, 45)).to.equal(20);
        expect(til(0, 20, 15)).to.equal(15);
        expect(til(20, 20, 41)).to.equal(40);
        expect(til(20, 20, 40)).to.equal(40);
    });
    describe('compareEtternavn', () => {
        it('sjekker at Johnsen blir evaluert til større enn Davidsen', () => {
            expect(compareEtternavn({ etternavn: 'Johnsen' }, { etternavn: 'Davidsen' })).to.equal(1);
        });
        it('sjekker at Rossi blir evaluert til mindre enn Svendsen', () => {
            expect(compareEtternavn({ etternavn: 'Rossi' }, { etternavn: 'Svendsen' })).to.equal(-1);
        });
        it('sjekker at Rossy blir evaluert til større enn Rossi', () => {
            expect(compareEtternavn({ etternavn: 'Rossy' }, { etternavn: 'Rossi' })).to.equal(1);
        });
        it('sjekker at rossy blir evaluert til større enn Rossi', () => {
            expect(compareEtternavn({ etternavn: 'Rossy' }, { etternavn: 'Rossi' })).to.equal(1);
        });
        it('sjekker at Stone og stone blir evaluert til like', () => {
            expect(compareEtternavn({ etternavn: 'Stone' }, { etternavn: 'Stone' })).to.equal(0);
        });
    });
    describe('sorterPaaEtternavn', () => {
        it('sjekker at listen blir sortert alfabetisk', () => {
            const veiledere = [
                { etternavn: 'Johnsen' },
                { etternavn: 'Albertsen' },
                { etternavn: 'Akselsen' },
                { etternavn: 'Marsvinsen' }
            ];

            expect(sorterPaaEtternavn(veiledere, ASCENDING)).to.deep.equal([
                { etternavn: 'Akselsen' },
                { etternavn: 'Albertsen' },
                { etternavn: 'Johnsen' },
                { etternavn: 'Marsvinsen' }
            ]);
        });
        it('sjekker at listen blir sortert motsatt alfabetisk', () => {
            const veiledere = [
                { etternavn: 'Johnsen' },
                { etternavn: 'Albertsen' },
                { etternavn: 'Akselsen' },
                { etternavn: 'Marsvinsen' }
            ];

            expect(sorterPaaEtternavn(veiledere, DESCENDING)).to.deep.equal([
                { etternavn: 'Marsvinsen' },
                { etternavn: 'Johnsen' },
                { etternavn: 'Albertsen' },
                { etternavn: 'Akselsen' }
            ]);
        });
    });
    describe('comparePortefoljestorrelser', () => {
        it('sjekker at en porteføljestørrelse på 20 blir evaluert til mindre enn en porteføljestørrelse på 21', () => {
            expect(comparePortefoljestorrelser({ portefoljestorrelse: 20 }, { portefoljestorrelse: 21 })).to.equal(-1);
        });
        it('sjekker at en porteføljestørrelse på 20 blir evaluert til større enn en porteføljestørrelse på 19', () => {
            expect(comparePortefoljestorrelser({ portefoljestorrelse: 20 }, { portefoljestorrelse: 19 })).to.equal(1);
        });
        it('sjekker at to porteføljestørrelser på 20 blir evaluert som like store', () => {
            expect(comparePortefoljestorrelser({ portefoljestorrelse: 20 }, { portefoljestorrelse: 20 })).to.equal(0);
        });
    });
    describe('sorterPaaPortefoljestorrelser', () => {
        it('sjekker at veiledere blir sortert etter portføljestørrelser i stigende rekkefølge', () => {
            const veiledere = [
                { portefoljestorrelse: 10 },
                { portefoljestorrelse: 5 },
                { portefoljestorrelse: 20 },
                { portefoljestorrelse: 2 }
            ];

            expect(sorterPaaPortefoljestorrelse(veiledere, ASCENDING)).to.deep.equal([
                { portefoljestorrelse: 2 },
                { portefoljestorrelse: 5 },
                { portefoljestorrelse: 10 },
                { portefoljestorrelse: 20 }
            ]);
        });
        it('sjekker at veiledere blir sortert etter portføljestørrelser i synkende rekkefølge', () => {
            const veiledere = [
                { portefoljestorrelse: 10 },
                { portefoljestorrelse: 5 },
                { portefoljestorrelse: 20 },
                { portefoljestorrelse: 2 }
            ];

            expect(sorterPaaPortefoljestorrelse(veiledere, ASCENDING)).to.deep.equal([
                { portefoljestorrelse: 2 },
                { portefoljestorrelse: 5 },
                { portefoljestorrelse: 10 },
                { portefoljestorrelse: 20 }
            ]);
        });
    });
});
