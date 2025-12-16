import 'babel-polyfill';
import moment from 'moment';
import {ukerIgjenTilUtlopsdato} from './utils';
import {oppfolgingStartetDato, toDatePrettyPrint} from './dato-utils';
import {oppfolingsdatoEnsligeForsorgere} from './enslig-forsorger';

describe('Date utils', () => {
    describe('utlopsdatoUker', () => {
        it('skal håndtere null verdier', () => {
            expect(ukerIgjenTilUtlopsdato(null)).toBeUndefined();
            expect(ukerIgjenTilUtlopsdato(undefined)).toBeUndefined();
            expect(ukerIgjenTilUtlopsdato('ikke gyldig datostreng')).toBeUndefined();
        });

        it('skal regne ut antall uker', () => {
            const uker = 7 * 24 * 3600 * 1000;
            const now = new Date().getTime();
            const fremtiden = new Date(now + 2 * uker);
            const fortiden = new Date(now - 2 * uker);

            expect(ukerIgjenTilUtlopsdato(`${fremtiden}`)).toBe(2);
            expect(ukerIgjenTilUtlopsdato(`${fortiden}`)).toBe(-2);
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
