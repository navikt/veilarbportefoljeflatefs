import {erObjektValuesTomt, lagretFilterValgModellErLik} from './mine-filter-utils';
import {AktiviteterAvtaltMedNav, AktiviteterValg} from '../../../filtrering/filter-konstanter';
import {initialState} from '../../../ducks/filtrering';
import {InnsatsgruppeGjeldendeVedtak14a} from '../../../typer/bruker-modell';
import {FiltervalgModell} from '../../../typer/filtervalg-modell';

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

    const ingenValgteFilter: FiltervalgModell = initialState;

    describe('Skal kunne oppdage om en filtermodell er tom', () => {
        it('når alle felt er tomme', () => {
            const filtervalgModell = ingenValgteFilter;

            expect(erObjektValuesTomt(filtervalgModell)).toBe(true);
        });

        it('når ikke alle felt er tomme', () => {
            const filtervalgModell = {
                ...ingenValgteFilter,
                innsatsgruppeGjeldendeVedtak14a: [
                    InnsatsgruppeGjeldendeVedtak14a.STANDARD_INNSATS,
                    InnsatsgruppeGjeldendeVedtak14a.SPESIELT_TILPASSET_INNSATS
                ]
            };

            expect(erObjektValuesTomt(filtervalgModell)).toBe(false);
        });
    });

    describe('Skal kunne sjekke om to filtermodeller er like', () => {
        it('når filterene har samme felt, men ulik rekkefølge', () => {
            const ingenValgteFilterVanligRekkefolge = ingenValgteFilter;

            const ingenValgteFilterAlfabetiskRekkefolge = {
                alder: [],
                arbeidslisteKategori: [],
                aktiviteter: ingenValgteAktiviteter,
                aktiviteterForenklet: [],
                avvik14aVedtak: [],
                barnUnder18Aar: [],
                barnUnder18AarAlder: [],
                cvJobbprofil: null,
                ensligeForsorgere: [],
                fargekategorier: [],
                ferdigfilterListe: [],
                foedeland: [],
                fodselsdagIMnd: [],
                formidlingsgruppe: [],
                geografiskBosted: [],
                gjeldendeVedtak14a: [],
                hovedmal: [],
                hovedmalGjeldendeVedtak14a: [],
                innsatsgruppe: [],
                innsatsgruppeGjeldendeVedtak14a: [],
                kjonn: null,
                landgruppe: [],
                manuellBrukerStatus: [],
                navnEllerFnrQuery: '',
                registreringstype: [],
                rettighetsgruppe: [],
                servicegruppe: [],
                sisteEndringKategori: [],
                stillingFraNavFilter: [],
                tiltakstyper: [],
                tolkBehovSpraak: [],
                tolkebehov: [],
                ulesteEndringer: null,
                utdanning: [],
                utdanningBestatt: [],
                utdanningGodkjent: [],
                visGeografiskBosted: [],
                veiledere: [],
                veilederNavnQuery: '',
                ytelse: null
            };

            expect(
                lagretFilterValgModellErLik(ingenValgteFilterVanligRekkefolge, ingenValgteFilterAlfabetiskRekkefolge)
            ).toBe(true);
        });

        it('når kjønn er ulikt', () => {
            const model1: FiltervalgModell = ingenValgteFilter;

            const model2 = {
                ...ingenValgteFilter,
                kjonn: 'K'
            };

            expect(lagretFilterValgModellErLik(model1, model2)).toBe(false);
        });

        it('når verdi for aktiviteter er lik', () => {
            const model1 = {
                ...ingenValgteFilter,
                aktiviteter: {
                    ...ingenValgteAktiviteter,
                    [AktiviteterAvtaltMedNav.GRUPPEAKTIVITET]: AktiviteterValg.JA
                }
            };

            const model2 = {
                ...ingenValgteFilter,
                aktiviteter: {
                    ...ingenValgteAktiviteter,
                    [AktiviteterAvtaltMedNav.GRUPPEAKTIVITET]: AktiviteterValg.JA
                }
            };

            expect(lagretFilterValgModellErLik(model1, model2)).toBe(true);
        });

        it('når verdi for aktiviteter er ulik', () => {
            const model1 = {
                ...ingenValgteFilter,
                aktiviteter: {
                    ...ingenValgteAktiviteter,
                    [AktiviteterAvtaltMedNav.GRUPPEAKTIVITET]: AktiviteterValg.JA
                }
            };

            const model2 = {
                ...ingenValgteFilter,
                aktiviteter: {
                    ...ingenValgteAktiviteter,
                    [AktiviteterAvtaltMedNav.GRUPPEAKTIVITET]: AktiviteterValg.NEI
                }
            };

            expect(lagretFilterValgModellErLik(model1, model2)).toBe(false);
        });
    });
});
