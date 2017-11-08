import { expect } from 'chai';
import 'babel-polyfill';
import { nesteUtlopsdatoEllerNull, utledMiljoFraHost, utledValgteAktivitetsTyper } from './utils';

describe('Date utils', () => {
    describe('Utlopsdato aktiviteter', () => {
        it('finn neste utlopsdato', () => {
            const nesteDatoString = '2050-08-20T13:22:00Z';
            const utlopsdatoer = { a1: nesteDatoString, a2: '2050-08-21T13:22:00Z' };
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
        it('skal returnere nyeste dato dersom én er null', () => {
            const nesteDatoString = '2050-08-20T13:22:00Z';
            const utlopsdatoer = { a1: nesteDatoString, a2: null };
            const nesteUtlopsdato = nesteUtlopsdatoEllerNull(utlopsdatoer);
            expect(nesteUtlopsdato.toUTCString()).to.equal(new Date(nesteDatoString).toUTCString());
        });
    });

    describe('Utledning av valgte aktiviteter', () => {
        it('skal utlede navn på valg aktivitet', () => {
            const aktivitetFiltervalg = { a1: 'NEI', a2: 'JA', a3: 'NA' };
            const brukerAktiviteter = {
                a1: '2050-08-20T13:22:00Z',
                a2: '2050-08-21T13:22:00Z',
                a3: '2050-08-22T13:22:00Z',
                a4: '2050-08-23T13:22:00Z'
            };
            expect(utledValgteAktivitetsTyper(brukerAktiviteter, aktivitetFiltervalg))
                .to
                .deep
                .equal({ a2: '2050-08-21T13:22:00Z' });
        });
        it('skal returnere null om objekter er tomt eller null', () => {
            expect(utledValgteAktivitetsTyper(null, null)).to.be.a('null');
            expect(utledValgteAktivitetsTyper({}, {})).to.be.a('null');
        });
        it('skal returnere null dersom ingen har status JA', () => {
            const aktivitetFiltervalg = { a1: 'NEI', a2: 'NA', a3: 'NA' };
            expect(utledValgteAktivitetsTyper(null, aktivitetFiltervalg)).to.be.a('null');
        });
    });
});

describe('URL utils', () => {
    describe('utledMiljoFraHost', () => {
        it('skal returnere tom streng når miljø er produksjon', () => {
            const host = 'app.adeo.no';
            expect(utledMiljoFraHost(host)).to.equal('');
        });
        it('skal returnere tom streng når miljø er localhost', () => {
            const host = 'localhost:8080';
            expect(utledMiljoFraHost(host)).to.equal('');
        });
        it('skal returnere tom streng når miljø er 127.0.0.1', () => {
            const host = '127.0.0.1:8080';
            expect(utledMiljoFraHost(host)).to.equal('');
        });
        it('skal returnere \'-t4\' når miljø er t4', () => {
            const host = 'veilederflatehendelser-t4.adeo.no';
            expect(utledMiljoFraHost(host)).to.equal('-t4');
        });
        it('skal returnere \'-q4\' når miljø er q4', () => {
            const host = 'app-q4.adeo.no';
            expect(utledMiljoFraHost(host)).to.equal('-q4');
        });
    });
});

