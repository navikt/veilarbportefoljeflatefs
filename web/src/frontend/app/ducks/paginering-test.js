import { expect } from 'chai';

import { til } from './paginering';

describe('PagineringReducer', () => {
    it('finner riktig til-indeks når subliste skal genereres', () => {
        expect(til(0, 20, 45)).to.equal(20);
        expect(til(0, 20, 15)).to.equal(15);
        expect(til(20, 20, 41)).to.equal(40);
        expect(til(20, 20, 40)).to.equal(40);
    });
});
