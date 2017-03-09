import { expect } from 'chai';

import { compareEtternavn } from './veiledere-side';

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
