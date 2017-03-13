import { expect } from 'chai';

import { filterUrlBuilder } from '../utils/utils';

describe('Utils', () => {
    it('skal legge til nyeBrukere i url hvis den er aktiv', () => {
        expect(filterUrlBuilder(true, false)).to.equal('&nyeBrukere=true');
    });

    it('skal legge til inaktiveBrukere i url hvis den er aktiv', () => {
        expect(filterUrlBuilder(false, true)).to.equal('&inaktiveBrukere=true');
    });

    it('skal legge til nyeBrukere og inaktiveBrukere i url hvis de er aktive', () => {
        expect(filterUrlBuilder(true, true)).to.equal('&nyeBrukere=true&inaktiveBrukere=true');
    });

    it('skal ikke legge til filtre i url hvis det ikke finnes filtre', () => {
        expect(filterUrlBuilder(false, false)).to.equal('');
    });
});
