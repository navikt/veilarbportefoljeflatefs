import { expect } from 'chai';
import { nesteUtlopsdatoEllerNull, utledValgtAktivitetstype } from './utils';

describe('Date utils', () => {
    describe('Utlopsdato aktiviteter', () => {
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

    describe('Utledning av valgt aktivitet', () => {
        it('skal utlede navn på valg aktivitet', () => {
            const aktivitetFiltervalg = { a1: 'NEI', a2: 'JA', a3: 'NA' };
            expect(utledValgtAktivitetstype(aktivitetFiltervalg)).to.equal('a2');
        });
        it('skal returnere null om objekter er tomt eller null', () => {
            expect(utledValgtAktivitetstype(null)).to.be.a('null');
            expect(utledValgtAktivitetstype({})).to.be.a('null');
        });
        it('skal returnere null dersom ingen har status JA', () => {
            const aktivitetFiltervalg = { a1: 'NEI', a2: 'NA', a3: 'NA' };
            expect(utledValgtAktivitetstype(aktivitetFiltervalg)).to.be.a('null');
        });
        it('skal returnere null dersom flere har status JA', () => {
            const aktivitetFiltervalg = { a1: 'JA', a2: 'JA', a3: 'NA' };
            expect(utledValgtAktivitetstype(aktivitetFiltervalg)).to.be.a('null');
        });
    });
});

