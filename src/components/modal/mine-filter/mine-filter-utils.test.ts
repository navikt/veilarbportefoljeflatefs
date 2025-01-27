import {erObjektValuesTomt, lagretFilterValgModellErLik} from './mine-filter-utils';
import {AktiviteterAvtaltMedNav} from '../../../filtrering/filter-konstanter';
import {AktiviteterValg, initialState} from '../../../ducks/filtrering';
import {FiltervalgModell} from '../../../model-interfaces';

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

    describe('Er objekt values tomt', () => {
        it('sjekk minoversikt', () => {
            const filtervalgModell = ingenValgteFilter;

            expect(erObjektValuesTomt(filtervalgModell)).toBe(true);
        });
    });

    describe('Er objekt lik', () => {
        it('Same', () => {
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

        it('Kjonn er ikke lik', () => {
            const model1: FiltervalgModell = ingenValgteFilter;

            const model2 = {
                ...ingenValgteFilter,
                kjonn: 'K'
            };

            expect(lagretFilterValgModellErLik(model1, model2)).toBe(false);
        });

        it('Aktiviteter verdi er lik', () => {
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

        it('Aktiviteter verdi er ulik', () => {
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
