import { expect } from 'chai';

import { filterUrlBuilder } from '../utils/utils';

describe('Utils', () => {
    it('skal legge til nyeBrukere i url hvis finnes', () => {
        expect(filterUrlBuilder(true, false)).to.equal('&nyeBrukere=true');
    });
});
