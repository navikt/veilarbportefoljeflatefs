import {erObjektValuesTomt, lagredeFilterListerErLik} from "./lagrede-filter-utils";

describe('Lagrede filter utils', () => {
    describe('Er objekt values tomt', () => {
        it('sjekk minoversikt', () => {
            const filtervalgModell = {
                aktiviteter: {
                    BEHANDLING: 'NA',
                    EGEN: 'NA',
                    GRUPPEAKTIVITET: 'NA',
                    IJOBB: 'NA',
                    MOTE: 'NA',
                    SOKEAVTALE: 'NA',
                    STILLING: 'NA',
                    TILTAK: 'NA',
                    UTDANNINGAKTIVITET: 'NA'
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
                    BEHANDLING: 'NA',
                    EGEN: 'NA',
                    GRUPPEAKTIVITET: 'NA',
                    IJOBB: 'NA',
                    MOTE: 'NA',
                    SOKEAVTALE: 'NA',
                    STILLING: 'NA',
                    TILTAK: 'NA',
                    UTDANNINGAKTIVITET: 'NA'
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
                    BEHANDLING: 'NA',
                    EGEN: 'NA',
                    GRUPPEAKTIVITET: 'NA',
                    IJOBB: 'NA',
                    MOTE: 'NA',
                    SOKEAVTALE: 'NA',
                    STILLING: 'NA',
                    TILTAK: 'NA',
                    UTDANNINGAKTIVITET: 'NA'
                },
                ytelse: null,
                registreringstype: [],
                cvJobbprofil: null,
                arbeidslisteKategori: []
            };

            expect(lagredeFilterListerErLik(model1, model2)).toBe(true);
        });

        it('Kjonn er ikke lik', () => {
            const model1 = {
                aktiviteter: {
                    BEHANDLING: 'NA',
                    EGEN: 'NA',
                    GRUPPEAKTIVITET: 'NA',
                    IJOBB: 'NA',
                    MOTE: 'NA',
                    SOKEAVTALE: 'NA',
                    STILLING: 'NA',
                    TILTAK: 'NA',
                    UTDANNINGAKTIVITET: 'NA'
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
                    BEHANDLING: 'NA',
                    EGEN: 'NA',
                    GRUPPEAKTIVITET: 'JA',
                    IJOBB: 'NA',
                    MOTE: 'NA',
                    SOKEAVTALE: 'NA',
                    STILLING: 'NA',
                    TILTAK: 'NA',
                    UTDANNINGAKTIVITET: 'NA'
                },
                ytelse: null,
                registreringstype: [],
                cvJobbprofil: null,
                arbeidslisteKategori: []
            };

            expect(lagredeFilterListerErLik(model1, model2)).toBe(false);
        });

        it('Aktiviteter verdi er lik', () => {
            const model1 = {
                aktiviteter: {
                    GRUPPEAKTIVITET: 'JA',
                    BEHANDLING: 'NA',
                    EGEN: 'NA',
                    IJOBB: 'NA',
                    MOTE: 'NA',
                    SOKEAVTALE: 'NA',
                    STILLING: 'NA',
                    TILTAK: 'NA',
                    UTDANNINGAKTIVITET: 'NA'
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
                    BEHANDLING: 'NA',
                    EGEN: 'NA',
                    GRUPPEAKTIVITET: 'JA',
                    IJOBB: 'NA',
                    MOTE: 'NA',
                    SOKEAVTALE: 'NA',
                    STILLING: 'NA',
                    TILTAK: 'NA',
                    UTDANNINGAKTIVITET: 'NA'
                },
                ytelse: null,
                registreringstype: [],
                cvJobbprofil: null,
                arbeidslisteKategori: []
            };

            expect(lagredeFilterListerErLik(model1, model2)).toBe(true);
        });
    });
});