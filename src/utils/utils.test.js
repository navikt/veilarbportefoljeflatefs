import {ukerIgjenTilUtlopsdato} from './utils';
import {formaterDato, oppfolgingStartetDato} from './dato-utils';
import {oppfolingsdatoEnsligeForsorgere} from './enslig-forsorger';
import dayjs from 'dayjs';

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
            expect(oppfolgingStartetDato('2016-02-01')).toStrictEqual('2017-12-04');
        });
        it('skal returnere gitt dato', () => {
            expect(oppfolgingStartetDato('2019-02-01')).toEqual('2019-02-01');
        });
    });

    describe('sjekke oppfolingsdatoEnsligeForsorgere dato', () => {
        it('barnet er under et halvt år skal returnere tilsvarene "6 mnd" tekst', () => {
            const idag = dayjs();
            const yngsteBarnFodselsdag = idag.clone().subtract(1, 'day');
            const barnEttHalvtAar = yngsteBarnFodselsdag.clone().add(6, 'months').format('YYYY-MM-DD');

            expect(oppfolingsdatoEnsligeForsorgere(yngsteBarnFodselsdag)).toBe(
                `${formaterDato(barnEttHalvtAar)} (Barn 6 mnd)`
            );
        });

        it('barnet er et halvt år skal returnere tilsvarene "6 mnd" tekst', () => {
            const idag = dayjs();
            const yngsteBarnFodselsdag = idag.clone();
            const barnEttHalvtAar = yngsteBarnFodselsdag.clone().add(6, 'months').format('YYYY-MM-DD');

            expect(oppfolingsdatoEnsligeForsorgere(yngsteBarnFodselsdag)).toBe(
                `${formaterDato(barnEttHalvtAar)} (Barn 6 mnd)`
            );
        });

        it('barnet er over ett halvt år skal returnere tilsvarene "1år" tekst', () => {
            const idag = dayjs();
            const yngsteBarnFodselsdag = idag.subtract(6, 'month').subtract(1, 'day');
            const barnEttAar = yngsteBarnFodselsdag.add(1, 'year').format('YYYY-MM-DD');

            expect(oppfolingsdatoEnsligeForsorgere(yngsteBarnFodselsdag)).toBe(
                `${formaterDato(barnEttAar)} (Barn 1 år)`
            );
        });

        it('barnet er enda ikke født skal returnere tilsvarene "6 mnd" tekst', () => {
            const idag = dayjs();
            const yngsteBarnFodselsdag = idag.clone().add(1, 'day');
            const barnEttAar = yngsteBarnFodselsdag.clone().add(6, 'months').format('YYYY-MM-DD');

            expect(oppfolingsdatoEnsligeForsorgere(yngsteBarnFodselsdag)).toBe(
                `${formaterDato(barnEttAar)} (Barn 6 mnd)`
            );
        });

        it('barnet er over 1 år skal returnere tilsvarene "1år" tekst', () => {
            const idag = dayjs();
            const yngsteBarnFodselsdag = idag.clone().subtract(1, 'years').subtract(1, 'months');
            const barnEttAar = yngsteBarnFodselsdag.clone().add(1, 'years').format('YYYY-MM-DD');

            expect(oppfolingsdatoEnsligeForsorgere(yngsteBarnFodselsdag)).toBe(
                `${formaterDato(barnEttAar)} (Barn 1 år)`
            );
        });
    });
});
