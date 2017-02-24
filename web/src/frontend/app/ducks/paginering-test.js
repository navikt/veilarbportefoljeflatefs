import { expect } from 'chai';

import { til, compareEtternavn } from './paginering';

describe('PagineringReducer', () => {
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
});
