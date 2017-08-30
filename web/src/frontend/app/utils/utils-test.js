import { expect } from 'chai';
import { nesteUtlopsdatoEllerNull } from './utils';

describe('Date utils', () => {
    it('finn neste utlopsdato', () => {
        const nesteDatoString = '2017-08-20T13:22:00Z';
        const utlopsdatoer = { a1: nesteDatoString, a2: '2017-08-21T13:22:00Z' };
        const nesteUtlopsdato = nesteUtlopsdatoEllerNull(utlopsdatoer);
        expect(nesteUtlopsdato.toUTCString()).to.equal(new Date(nesteDatoString).toUTCString());
    });
    it('skal returnere null om ingen datoer finnes', () => {
        // eslint-disable-next-line no-unused-expressions
        expect(!!nesteUtlopsdatoEllerNull({})).to.be.false;
    });
    it('skal returnere null dersom dato er null', () => {
        // eslint-disable-next-line no-unused-expressions
        expect(!!nesteUtlopsdatoEllerNull({ a: null })).to.be.false;
    });
    it('skal returnere nyste dato dersom én er null', () => {
        const nesteDatoString = '2017-08-20T13:22:00Z';
        const utlopsdatoer = { a1: nesteDatoString, a2: null };
        const nesteUtlopsdato = nesteUtlopsdatoEllerNull(utlopsdatoer);
        expect(nesteUtlopsdato.toUTCString()).to.equal(new Date(nesteDatoString).toUTCString());
    });
});

