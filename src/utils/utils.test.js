import 'babel-polyfill';
import moment from 'moment';
import {nesteUtlopsdatoEllerNull, utledValgteAktivitetsTyper, utlopsdatoUker} from './utils';
import {oppfolgingStartetDato, toDatePrettyPrint} from './dato-utils';
import {AktiviteterValg} from '../filtrering/filter-konstanter';
import {oppfolingsdatoEnsligeForsorgere} from './enslig-forsorger';

describe('Date utils', () => {
    describe('Utlopsdato aktiviteter', () => {
        it('finn neste utlopsdato', () => {
            const nesteDatoString = '2050-08-20T13:22:00Z';
            const utlopsdatoer = {a1: nesteDatoString, a2: '2050-08-21T13:22:00Z'};
            const nesteUtlopsdato = nesteUtlopsdatoEllerNull(utlopsdatoer);
            expect(nesteUtlopsdato.toUTCString()).toBe(new Date(nesteDatoString).toUTCString());
        });
        it('skal returnere null om ingen datoer finnes', () => {
            expect(!!nesteUtlopsdatoEllerNull({})).toBeFalsy();
        });
        it('skal returnere null dersom dato er null', () => {
            expect(!!nesteUtlopsdatoEllerNull({a: null})).toBeFalsy();
        });
        it('skal returnere nyeste dato dersom én er null', () => {
            const nesteDatoString = '2050-08-20T13:22:00Z';
            const utlopsdatoer = {a1: nesteDatoString, a2: null};
            const nesteUtlopsdato = nesteUtlopsdatoEllerNull(utlopsdatoer);
            expect(nesteUtlopsdato.toUTCString()).toBe(new Date(nesteDatoString).toUTCString());
        });
    });

    describe('Utledning av valgte aktiviteter', () => {
        it('skal utlede navn på valg aktivitet', () => {
            const aktivitetFiltervalg = {a1: AktiviteterValg.NEI, a2: AktiviteterValg.JA, a3: AktiviteterValg.NA};
            const brukerAktiviteter = {
                a1: '2050-08-20T13:22:00Z',
                a2: '2050-08-21T13:22:00Z',
                a3: '2050-08-22T13:22:00Z',
                a4: '2050-08-23T13:22:00Z'
            };
            expect(utledValgteAktivitetsTyper(brukerAktiviteter, aktivitetFiltervalg)).toStrictEqual({
                a2: '2050-08-21T13:22:00Z'
            });
        });
        it('skal returnere null om objekter er tomt eller null', () => {
            expect(utledValgteAktivitetsTyper(null, null)).toBeNull();
            expect(utledValgteAktivitetsTyper({}, {})).toBeNull();
        });
        it('skal returnere null dersom ingen har status JA', () => {
            const aktivitetFiltervalg = {a1: AktiviteterValg.NEI, a2: AktiviteterValg.NA, a3: AktiviteterValg.NA};
            expect(utledValgteAktivitetsTyper(null, aktivitetFiltervalg)).toBeNull();
        });
    });

    describe('utlopsdatoUker', () => {
        it('skal håndtere null verdier', () => {
            expect(utlopsdatoUker(null)).toBeUndefined();
            expect(utlopsdatoUker(undefined)).toBeUndefined();
            expect(utlopsdatoUker('ikke gyldig datostreng')).toBeUndefined();
        });

        it('skal regne ut antall uker', () => {
            const uker = 7 * 24 * 3600 * 1000;
            const now = new Date().getTime();
            const fremtiden = new Date(now + 2 * uker);
            const fortiden = new Date(now - 2 * uker);

            expect(utlopsdatoUker(`${fremtiden}`)).toBe(2);
            expect(utlopsdatoUker(`${fortiden}`)).toBe(-2);
        });
    });

    describe('Sjekke oppfølging startet-dato', () => {
        it('Dato er før 04.12.2017, skal returnere null', () => {
            expect(oppfolgingStartetDato('2016-02-01')).toStrictEqual(new Date('2017-12-04'));
            expect(oppfolgingStartetDato(undefined)).toBeNull();
            expect(oppfolgingStartetDato(null)).toBeNull();
        });
        it('skal returnere gitt dato', () => {
            expect(oppfolgingStartetDato('2019-02-01')).toEqual(new Date('2019-02-01'));
        });
    });

    describe('sjekke oppfolingsdatoEnsligeForsorgere dato', () => {
        it('barnet er under et halvt år skal returnere tilsvarene "6 mnd" tekst', () => {
            const idag = moment();
            const yngsteBarnFodselsdag = idag.clone().subtract(1, 'day');
            const barnEttHalvtAar = yngsteBarnFodselsdag.clone().add(6, 'months');

            expect(oppfolingsdatoEnsligeForsorgere(yngsteBarnFodselsdag.toDate())).toBe(
                `${toDatePrettyPrint(barnEttHalvtAar)} (Barn 6 mnd)`
            );
        });

        it('barnet er et halvt år skal returnere tilsvarene "6 mnd" tekst', () => {
            const idag = moment();
            const yngsteBarnFodselsdag = idag.clone();
            const barnEttHalvtAar = yngsteBarnFodselsdag.clone().add(6, 'months');

            expect(oppfolingsdatoEnsligeForsorgere(yngsteBarnFodselsdag.toDate())).toBe(
                `${toDatePrettyPrint(barnEttHalvtAar)} (Barn 6 mnd)`
            );
        });

        it('barnet er over ett halvt år skal returnere tilsvarene "1år" tekst', () => {
            const idag = moment();
            const yngsteBarnFodselsdag = idag.clone().subtract({days: 1, months: 6});
            const barnEttAar = yngsteBarnFodselsdag.clone().add({years: 1}).toDate();

            expect(oppfolingsdatoEnsligeForsorgere(yngsteBarnFodselsdag.toDate())).toBe(
                `${toDatePrettyPrint(barnEttAar)} (Barn 1 år)`
            );
        });

        it('barnet er enda ikke født skal returnere tilsvarene "6 mnd" tekst', () => {
            const idag = moment();
            const yngsteBarnFodselsdag = idag.clone().add({days: 1});
            const barnEttAar = yngsteBarnFodselsdag.clone().add({months: 6}).toDate();

            expect(oppfolingsdatoEnsligeForsorgere(yngsteBarnFodselsdag.toDate())).toBe(
                `${toDatePrettyPrint(barnEttAar)} (Barn 6 mnd)`
            );
        });

        it('barnet er over 1 år skal returnere tilsvarene "1år" tekst', () => {
            const idag = moment();
            const yngsteBarnFodselsdag = idag.clone().subtract({years: 1, months: 1});
            const barnEttAar = yngsteBarnFodselsdag.clone().add({years: 1}).toDate();

            expect(oppfolingsdatoEnsligeForsorgere(yngsteBarnFodselsdag.toDate())).toBe(
                `${toDatePrettyPrint(barnEttAar)} (Barn 1 år)`
            );
        });
    });
});
