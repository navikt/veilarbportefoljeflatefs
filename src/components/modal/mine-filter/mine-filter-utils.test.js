import {erObjektValuesTomt, lagretFilterValgModellErLik} from './mine-filter-utils';
import {AktiviteterAvtaltMedNav} from '../../../filtrering/filter-konstanter';
import {AktiviteterValg} from '../../../ducks/filtrering';

describe('Mine filter utils', () => {
    const ingenValgteAktiviteter = {
        [AktiviteterAvtaltMedNav.BEHANDLING]: AktiviteterValg.NA,
        [AktiviteterAvtaltMedNav.EGEN]: AktiviteterValg.NA,
        [AktiviteterAvtaltMedNav.GRUPPEAKTIVITET]: AktiviteterValg.NA,
        [AktiviteterAvtaltMedNav.IJOBB]: AktiviteterValg.NA,
        [AktiviteterAvtaltMedNav.MOTE]: AktiviteterValg.NA,
        [AktiviteterAvtaltMedNav.SOKEAVTALE]: AktiviteterValg.NA,
        [AktiviteterAvtaltMedNav.STILLING]: AktiviteterValg.NA,
        [AktiviteterAvtaltMedNav.TILTAK]: AktiviteterValg.NA,
        [AktiviteterAvtaltMedNav.UTDANNINGAKTIVITET]: AktiviteterValg.NA
    };

    describe('Er objekt values tomt', () => {
        it('sjekk minoversikt', () => {
            const filtervalgModell = {
                aktiviteter: ingenValgteAktiviteter,
                alder: [],
                ferdigfilterListe: [],
                fodselsdagIMnd: [],
                formidlingsgruppe: [],
                hovedmal: [],
                innsatsgruppe: [],
                kjonn: null,
                manuellBrukerStatus: [],
                navnEllerFnrQuery: '',
                rettighetsgruppe: [],
                servicegruppe: [],
                tiltakstyper: [],
                veilederNavnQuery: '',
                veiledere: [],
                ytelse: null,
                registreringstype: [],
                cvJobbprofil: null,
                arbeidslisteKategori: []
            };

            expect(erObjektValuesTomt(filtervalgModell)).toBe(true);
        });
    });

    describe('Er objekt lik', () => {
        it('Same', () => {
            const model1 = {
                aktiviteter: ingenValgteAktiviteter,
                alder: [],
                ferdigfilterListe: [],
                fodselsdagIMnd: [],
                formidlingsgruppe: [],
                hovedmal: [],
                innsatsgruppe: [],
                kjonn: null,
                manuellBrukerStatus: [],
                navnEllerFnrQuery: '',
                rettighetsgruppe: [],
                servicegruppe: [],
                tiltakstyper: [],
                veilederNavnQuery: '',
                veiledere: [],
                ytelse: null,
                registreringstype: [],
                cvJobbprofil: null,
                arbeidslisteKategori: []
            };

            const model2 = {
                servicegruppe: [],
                kjonn: null,
                alder: [],
                ferdigfilterListe: [],
                fodselsdagIMnd: [],
                formidlingsgruppe: [],
                hovedmal: [],
                innsatsgruppe: [],
                manuellBrukerStatus: [],
                navnEllerFnrQuery: '',
                rettighetsgruppe: [],
                tiltakstyper: [],
                veilederNavnQuery: '',
                veiledere: [],
                aktiviteter: ingenValgteAktiviteter,
                ytelse: null,
                registreringstype: [],
                cvJobbprofil: null,
                arbeidslisteKategori: []
            };

            expect(lagretFilterValgModellErLik(model1, model2)).toBe(true);
        });

        it('Kjonn er ikke lik', () => {
            const model1 = {
                aktiviteter: ingenValgteAktiviteter,
                alder: [],
                ferdigfilterListe: [],
                fodselsdagIMnd: [],
                formidlingsgruppe: [],
                hovedmal: [],
                innsatsgruppe: [],
                kjonn: null,
                manuellBrukerStatus: [],
                navnEllerFnrQuery: '',
                rettighetsgruppe: [],
                servicegruppe: [],
                tiltakstyper: [],
                veilederNavnQuery: '',
                veiledere: [],
                ytelse: null,
                registreringstype: [],
                cvJobbprofil: null,
                arbeidslisteKategori: []
            };

            const model2 = {
                servicegruppe: [],
                kjonn: 'K',
                alder: [],
                ferdigfilterListe: [],
                fodselsdagIMnd: [],
                formidlingsgruppe: [],
                hovedmal: [],
                innsatsgruppe: [],
                manuellBrukerStatus: [],
                navnEllerFnrQuery: '',
                rettighetsgruppe: [],
                tiltakstyper: [],
                veilederNavnQuery: '',
                veiledere: [],
                aktiviteter: {
                    ...ingenValgteAktiviteter,
                    [AktiviteterAvtaltMedNav.GRUPPEAKTIVITET]: AktiviteterValg.JA
                },
                ytelse: null,
                registreringstype: [],
                cvJobbprofil: null,
                arbeidslisteKategori: []
            };

            expect(lagretFilterValgModellErLik(model1, model2)).toBe(false);
        });

        it('Aktiviteter verdi er lik', () => {
            const model1 = {
                aktiviteter: {
                    ...ingenValgteAktiviteter,
                    [AktiviteterAvtaltMedNav.GRUPPEAKTIVITET]: AktiviteterValg.JA
                },
                alder: [],
                ferdigfilterListe: [],
                fodselsdagIMnd: [],
                formidlingsgruppe: [],
                hovedmal: [],
                innsatsgruppe: [],
                kjonn: null,
                manuellBrukerStatus: [],
                navnEllerFnrQuery: '',
                rettighetsgruppe: [],
                servicegruppe: [],
                tiltakstyper: [],
                veilederNavnQuery: '',
                veiledere: [],
                ytelse: null,
                registreringstype: [],
                cvJobbprofil: null,
                arbeidslisteKategori: []
            };

            const model2 = {
                servicegruppe: [],
                kjonn: null,
                alder: [],
                ferdigfilterListe: [],
                fodselsdagIMnd: [],
                formidlingsgruppe: [],
                hovedmal: [],
                innsatsgruppe: [],
                manuellBrukerStatus: [],
                navnEllerFnrQuery: '',
                rettighetsgruppe: [],
                tiltakstyper: [],
                veilederNavnQuery: '',
                veiledere: [],
                aktiviteter: {
                    ...ingenValgteAktiviteter,
                    [AktiviteterAvtaltMedNav.GRUPPEAKTIVITET]: AktiviteterValg.JA
                },
                ytelse: null,
                registreringstype: [],
                cvJobbprofil: null,
                arbeidslisteKategori: []
            };

            expect(lagretFilterValgModellErLik(model1, model2)).toBe(true);
        });
    });
});
