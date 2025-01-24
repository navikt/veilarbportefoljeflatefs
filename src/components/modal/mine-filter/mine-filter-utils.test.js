import {erObjektValuesTomt, lagretFilterValgModellErLik} from './mine-filter-utils';
import {AktiviteterAvtaltMedNav} from '../../../filtrering/filter-konstanter';

describe('Mine filter utils', () => {
    describe('Er objekt values tomt', () => {
        it('sjekk minoversikt', () => {
            const filtervalgModell = {
                aktiviteter: {
                    [AktiviteterAvtaltMedNav.BEHANDLING]: 'NA',
                    [AktiviteterAvtaltMedNav.EGEN]: 'NA',
                    [AktiviteterAvtaltMedNav.GRUPPEAKTIVITET]: 'NA',
                    [AktiviteterAvtaltMedNav.IJOBB]: 'NA',
                    [AktiviteterAvtaltMedNav.MOTE]: 'NA',
                    [AktiviteterAvtaltMedNav.SOKEAVTALE]: 'NA',
                    [AktiviteterAvtaltMedNav.STILLING]: 'NA',
                    [AktiviteterAvtaltMedNav.TILTAK]: 'NA',
                    [AktiviteterAvtaltMedNav.UTDANNINGAKTIVITET]: 'NA'
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

            expect(erObjektValuesTomt(filtervalgModell)).toBe(true);
        });
    });

    describe('Er objekt lik', () => {
        it('Same', () => {
            const model1 = {
                aktiviteter: {
                    [AktiviteterAvtaltMedNav.BEHANDLING]: 'NA',
                    [AktiviteterAvtaltMedNav.EGEN]: 'NA',
                    [AktiviteterAvtaltMedNav.GRUPPEAKTIVITET]: 'NA',
                    [AktiviteterAvtaltMedNav.IJOBB]: 'NA',
                    [AktiviteterAvtaltMedNav.MOTE]: 'NA',
                    [AktiviteterAvtaltMedNav.SOKEAVTALE]: 'NA',
                    [AktiviteterAvtaltMedNav.STILLING]: 'NA',
                    [AktiviteterAvtaltMedNav.TILTAK]: 'NA',
                    [AktiviteterAvtaltMedNav.UTDANNINGAKTIVITET]: 'NA'
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
                    [AktiviteterAvtaltMedNav.BEHANDLING]: 'NA',
                    [AktiviteterAvtaltMedNav.EGEN]: 'NA',
                    [AktiviteterAvtaltMedNav.GRUPPEAKTIVITET]: 'NA',
                    [AktiviteterAvtaltMedNav.IJOBB]: 'NA',
                    [AktiviteterAvtaltMedNav.MOTE]: 'NA',
                    [AktiviteterAvtaltMedNav.SOKEAVTALE]: 'NA',
                    [AktiviteterAvtaltMedNav.STILLING]: 'NA',
                    [AktiviteterAvtaltMedNav.TILTAK]: 'NA',
                    [AktiviteterAvtaltMedNav.UTDANNINGAKTIVITET]: 'NA'
                },
                ytelse: null,
                registreringstype: [],
                cvJobbprofil: null,
                arbeidslisteKategori: []
            };

            expect(lagretFilterValgModellErLik(model1, model2)).toBe(true);
        });

        it('Kjonn er ikke lik', () => {
            const model1 = {
                aktiviteter: {
                    [AktiviteterAvtaltMedNav.BEHANDLING]: 'NA',
                    [AktiviteterAvtaltMedNav.EGEN]: 'NA',
                    [AktiviteterAvtaltMedNav.GRUPPEAKTIVITET]: 'NA',
                    [AktiviteterAvtaltMedNav.IJOBB]: 'NA',
                    [AktiviteterAvtaltMedNav.MOTE]: 'NA',
                    [AktiviteterAvtaltMedNav.SOKEAVTALE]: 'NA',
                    [AktiviteterAvtaltMedNav.STILLING]: 'NA',
                    [AktiviteterAvtaltMedNav.TILTAK]: 'NA',
                    [AktiviteterAvtaltMedNav.UTDANNINGAKTIVITET]: 'NA'
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
                    [AktiviteterAvtaltMedNav.BEHANDLING]: 'NA',
                    [AktiviteterAvtaltMedNav.EGEN]: 'NA',
                    [AktiviteterAvtaltMedNav.GRUPPEAKTIVITET]: 'JA',
                    [AktiviteterAvtaltMedNav.IJOBB]: 'NA',
                    [AktiviteterAvtaltMedNav.MOTE]: 'NA',
                    [AktiviteterAvtaltMedNav.SOKEAVTALE]: 'NA',
                    [AktiviteterAvtaltMedNav.STILLING]: 'NA',
                    [AktiviteterAvtaltMedNav.TILTAK]: 'NA',
                    [AktiviteterAvtaltMedNav.UTDANNINGAKTIVITET]: 'NA'
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
                    [AktiviteterAvtaltMedNav.GRUPPEAKTIVITET]: 'JA',
                    [AktiviteterAvtaltMedNav.BEHANDLING]: 'NA',
                    [AktiviteterAvtaltMedNav.EGEN]: 'NA',
                    [AktiviteterAvtaltMedNav.IJOBB]: 'NA',
                    [AktiviteterAvtaltMedNav.MOTE]: 'NA',
                    [AktiviteterAvtaltMedNav.SOKEAVTALE]: 'NA',
                    [AktiviteterAvtaltMedNav.STILLING]: 'NA',
                    [AktiviteterAvtaltMedNav.TILTAK]: 'NA',
                    [AktiviteterAvtaltMedNav.UTDANNINGAKTIVITET]: 'NA'
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
                    [AktiviteterAvtaltMedNav.BEHANDLING]: 'NA',
                    [AktiviteterAvtaltMedNav.EGEN]: 'NA',
                    [AktiviteterAvtaltMedNav.GRUPPEAKTIVITET]: 'JA',
                    [AktiviteterAvtaltMedNav.IJOBB]: 'NA',
                    [AktiviteterAvtaltMedNav.MOTE]: 'NA',
                    [AktiviteterAvtaltMedNav.SOKEAVTALE]: 'NA',
                    [AktiviteterAvtaltMedNav.STILLING]: 'NA',
                    [AktiviteterAvtaltMedNav.TILTAK]: 'NA',
                    [AktiviteterAvtaltMedNav.UTDANNINGAKTIVITET]: 'NA'
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
