import {AppState} from '../../reducer';
import {Kolonne, ListevisningState, OversiktType} from './listevisning';
import {
    AAPFilterKelvin,
    AktiviteterFilternokler,
    AktiviteterValg,
    HAR_14A_VEDTAK,
    I_AVTALT_AKTIVITET,
    MINE_HUSKELAPPER,
    MOTER_IDAG,
    TILTAKSHENDELSER,
    TiltakspengerFilter,
    TiltakspengerFilterArena,
    UDELT_SAMTALEREFERAT,
    UNDER_VURDERING,
    UTGATTE_VARSEL,
    UTLOPTE_AKTIVITETER,
    VENTER_PA_SVAR_FRA_BRUKER,
    VENTER_PA_SVAR_FRA_NAV
} from '../../filtrering/filter-konstanter';
import {FiltervalgModell} from '../../typer/filtervalg-modell';
import {
    filtrertPaAapFilterArenaMenIkkeBegge,
    filtrertPaBeggeAapFilterArena,
    filtrertPaOrdinarAapFilterArena,
    filtrertPaUnntakAapFilterArena
} from '../../utils/AapFiltermigreringUtils';

export function selectMuligeAlternativer(state: AppState, oversiktType: OversiktType): Kolonne[] {
    if (oversiktType === OversiktType.minOversikt) {
        return state.ui.listevisningMinOversikt.mulige;
    }
    return state.ui.listevisningEnhetensOversikt.mulige;
}

export function selectValgteAlternativer(state: AppState, oversiktType: OversiktType): Kolonne[] {
    if (oversiktType === OversiktType.minOversikt) {
        return state.ui.listevisningMinOversikt.valgte;
    }
    return state.ui.listevisningEnhetensOversikt.valgte;
}

export function selectListeVisning(state: AppState, oversiktType: OversiktType): ListevisningState {
    if (oversiktType === OversiktType.minOversikt) {
        return state.ui.listevisningMinOversikt;
    }
    return state.ui.listevisningEnhetensOversikt;
}

function addHvis(kolonne: Kolonne, add: boolean): Kolonne[] {
    return add ? [kolonne] : [];
}

function harValgtMinstEnAktivitet(aktiviteter: AktiviteterFilternokler): boolean {
    return Object.entries(aktiviteter).filter(([_, value]) => value === AktiviteterValg.JA).length >= 1;
}

export function getFiltreringState(state: AppState, oversiktType: OversiktType): FiltervalgModell {
    switch (oversiktType) {
        case OversiktType.enhetensOversikt:
            return state.filtreringEnhetensOversikt;
        case OversiktType.minOversikt:
            return state.filtreringMinoversikt;
        case OversiktType.veilederOversikt:
            return state.filtreringVeilederoversikt;
    }
}

export function getMuligeKolonner(filtervalg: FiltervalgModell, oversiktType: OversiktType): Kolonne[] {
    const filtrertPaLandgruppeEllerFoedeland = filtervalg.landgruppe.length > 0 || filtervalg.foedeland.length > 0;

    const filtrertPaGeografiskBosted =
        filtervalg.geografiskBosted.length > 0 || filtervalg.visGeografiskBosted.length > 0;

    const filtrertPaSisteEndringKategori =
        filtervalg.sisteEndringKategori != null && filtervalg.sisteEndringKategori !== '';

    const filtrertPaMoterIDag = filtervalg.ferdigfilterListe.includes(MOTER_IDAG);

    const filtrertPaVenterPaSvarFraNav = filtervalg.ferdigfilterListe.includes(VENTER_PA_SVAR_FRA_NAV);
    const filtrertPaVenterPaSvarFraBruker = filtervalg.ferdigfilterListe.includes(VENTER_PA_SVAR_FRA_BRUKER);

    const filtrertPaUnderVurdering = filtervalg.ferdigfilterListe.includes(UNDER_VURDERING);

    const filtrertPaDagpengerArena = filtervalg.ytelseDagpengerArena.length > 0;
    const filtrertPaDagpenger = filtervalg.ytelseDagpenger.length > 0;

    const harIkkeFiltertPaIAvtaltAktivitet = !filtervalg.ferdigfilterListe.includes(I_AVTALT_AKTIVITET);
    const mistEttAktivitetfilterErValgt =
        harValgtMinstEnAktivitet(filtervalg.aktiviteter!) ||
        filtervalg.aktiviteterForenklet.length > 0 ||
        filtervalg.tiltakstyper.length > 0;

    const filtrertPaIAvtaltAktivitetIMinOversikt =
        oversiktType === OversiktType.minOversikt && filtervalg.ferdigfilterListe.includes(I_AVTALT_AKTIVITET);

    const filtrertPaTolkBehov =
        filtervalg.tolkebehov.length > 0 ||
        (filtervalg.tolkBehovSpraak !== undefined &&
            filtervalg.tolkBehovSpraak !== null &&
            filtervalg.tolkBehovSpraak.length > 0);

    const filtertPaAapIKelvin = filtervalg.ytelseAapKelvin.includes(AAPFilterKelvin.HAR_AAP_I_KELVIN);
    const filtrertPaTiltakspenger = filtervalg.ytelseTiltakspenger.includes(TiltakspengerFilter.HAR_TILTAKSPENGER);

    /* Hjelpeverdiar for AAP-filter Arena */
    const ordinarAapArena = filtrertPaOrdinarAapFilterArena(filtervalg);
    const unntakAapArena = filtrertPaUnntakAapFilterArena(filtervalg);
    const filtrertPaBeggeAapArena = filtrertPaBeggeAapFilterArena(filtervalg);
    const filtrertPaBeggeAapArenaOgIkkeAapKelvin = filtrertPaBeggeAapArena && !filtertPaAapIKelvin;
    const filtrertPaBeggeAapArenaOgAapKelvin = filtrertPaBeggeAapArena && filtertPaAapIKelvin;
    const aapArenaMenIkkeBegge = filtrertPaAapFilterArenaMenIkkeBegge(filtervalg);

    // Ulik rekkefølgje på vurderingsfrist-kolonne basert på filtervalg
    const filtrertPaAAPMedVurderingsfrist = aapArenaMenIkkeBegge;
    const filtrertPaAAPUtenVurderingsfrist = filtrertPaBeggeAapArena;

    // Ulik rekkefølgje på vedtaksperiode-kolonne basert på filtervalg
    const filtrertPaAAPMedVedtaksperiode = unntakAapArena || filtrertPaBeggeAapArena;
    const filtrertPaBareOrdinarAapArena = ordinarAapArena && !unntakAapArena;

    // Ulik rekkefølgje på rettighetsperiode-kolonne basert på filtervalg
    const filtrertPaAAPMedRettighetsperiode = ordinarAapArena || filtrertPaBeggeAapArena;
    const filtrertPaBareAapUnntakArena = unntakAapArena && !ordinarAapArena;

    const filtrertPaTiltakspengerArena = filtervalg.ytelseTiltakspengerArena.includes(
        TiltakspengerFilterArena.HAR_TILTAKSPENGER
    );

    const erPaEnhetensOversikt = oversiktType === OversiktType.enhetensOversikt;

    const erPaEnhetensOversiktOgIkkeFiltrertPaMoterIDag = erPaEnhetensOversikt && !filtrertPaMoterIDag;

    const filtrertPaEnsligForsorger = !!filtervalg.ensligeForsorgere.length;

    const filtrertPaBarnUnder18Ar = !!filtervalg.barnUnder18Aar.length || !!filtervalg.barnUnder18AarAlder.length;

    const filtrertPaUtdanningEllerSituasjonSomKanHaEndring =
        filtervalg.registreringstype?.length > 0 ||
        filtervalg.utdanning.length > 0 ||
        filtervalg.utdanningGodkjent.length > 0 ||
        filtervalg.utdanningBestatt.length > 0;

    const filtrertPaHuskelapp = filtervalg.ferdigfilterListe.includes(MINE_HUSKELAPPER);

    const filtrertPaTiltakshendelse = filtervalg.ferdigfilterListe.includes(TILTAKSHENDELSER);

    const filtrertPaHendelse = [UTGATTE_VARSEL, UDELT_SAMTALEREFERAT].some(f =>
        filtervalg.ferdigfilterListe.includes(f)
    );

    const filtrertPaGjeldendeVedtak14a = filtervalg.gjeldendeVedtak14a.includes(HAR_14A_VEDTAK);
    const filtrertPaInnsatsgruppeGjeldendeVedtak14a = filtervalg.innsatsgruppeGjeldendeVedtak14a.length > 0;
    const filtrertPaHovedmalGjeldendeVedtak14a = filtervalg.hovedmalGjeldendeVedtak14a.length > 0;
    const filtrertPaEtGjeldendeVedtak14aFilter =
        filtrertPaGjeldendeVedtak14a ||
        filtrertPaInnsatsgruppeGjeldendeVedtak14a ||
        filtrertPaHovedmalGjeldendeVedtak14a;

    /* Rekkefølgja her avgjer kva kolonner som er vist som standard,
     * fordi dei tre første mulige kolonnene basert på valgte filter er dei som vert vist.
     * Rekkefølga til kolonnene i tabellen er styrt av rekkefølgja på deira JSX-element i *-kolonner.tsx og *-listehode.tsx
     * 2024-11-22, Ingrid */
    return ([] as Kolonne[])
        .concat(addHvis(Kolonne.FODELAND, filtrertPaLandgruppeEllerFoedeland))
        .concat(addHvis(Kolonne.STATSBORGERSKAP, filtrertPaLandgruppeEllerFoedeland))
        .concat(addHvis(Kolonne.STATSBORGERSKAP_GYLDIG_FRA, filtrertPaLandgruppeEllerFoedeland))
        .concat(addHvis(Kolonne.BOSTED_KOMMUNE, filtrertPaGeografiskBosted))
        .concat(addHvis(Kolonne.BOSTED_BYDEL, filtrertPaGeografiskBosted))
        .concat(addHvis(Kolonne.SISTE_ENDRING, filtrertPaSisteEndringKategori))
        .concat(addHvis(Kolonne.SISTE_ENDRING_DATO, filtrertPaSisteEndringKategori))
        .concat(addHvis(Kolonne.MOTER_IDAG, filtrertPaMoterIDag))
        .concat(addHvis(Kolonne.VEILEDER, filtrertPaMoterIDag && erPaEnhetensOversikt))
        .concat(addHvis(Kolonne.MOTER_VARIGHET, filtrertPaMoterIDag))
        .concat(addHvis(Kolonne.MOTE_ER_AVTALT, filtrertPaMoterIDag))
        .concat(addHvis(Kolonne.UTLOPTE_AKTIVITETER, filtervalg.ferdigfilterListe.includes(UTLOPTE_AKTIVITETER)))
        .concat(addHvis(Kolonne.AVTALT_AKTIVITET, filtervalg.ferdigfilterListe.includes(I_AVTALT_AKTIVITET)))
        .concat(addHvis(Kolonne.VENTER_SVAR_FRA_NAV_DATO, filtrertPaVenterPaSvarFraNav))
        .concat(addHvis(Kolonne.VENTER_SVAR_FRA_BRUKER_DATO, filtrertPaVenterPaSvarFraBruker))
        .concat(addHvis(Kolonne.TILTAKSHENDELSE_LENKE, filtrertPaTiltakshendelse))
        .concat(addHvis(Kolonne.TILTAKSHENDELSE_DATO_OPPRETTET, filtrertPaTiltakshendelse))
        .concat(addHvis(Kolonne.FILTERHENDELSE_LENKE, filtrertPaHendelse))
        .concat(addHvis(Kolonne.FILTERHENDELSE_DATO_OPPRETTET, filtrertPaHendelse))
        .concat(addHvis(Kolonne.VEDTAKSTATUS, filtrertPaUnderVurdering))
        .concat(addHvis(Kolonne.VEDTAKSTATUS_ENDRET, filtrertPaUnderVurdering))
        .concat(addHvis(Kolonne.ANSVARLIG_VEILEDER_FOR_VEDTAK, filtrertPaUnderVurdering))
        .concat(addHvis(Kolonne.YTELSE_ARENA_GJENSTAENDE_UKER_RETTIGHET_DAGPENGER, filtrertPaDagpengerArena))
        .concat(addHvis(Kolonne.YTELSE_ARENA_GJENSTAENDE_UKER_VEDTAK_TILTAKSPENGER, filtrertPaTiltakspengerArena))
        .concat(addHvis(Kolonne.UTLOP_AKTIVITET, mistEttAktivitetfilterErValgt && harIkkeFiltertPaIAvtaltAktivitet))
        .concat(addHvis(Kolonne.START_DATO_AKTIVITET, filtrertPaIAvtaltAktivitetIMinOversikt))
        .concat(addHvis(Kolonne.NESTE_START_DATO_AKTIVITET, filtrertPaIAvtaltAktivitetIMinOversikt))
        .concat(addHvis(Kolonne.FORRIGE_START_DATO_AKTIVITET, filtrertPaIAvtaltAktivitetIMinOversikt))
        .concat(addHvis(Kolonne.TOLKEBEHOV, filtrertPaTolkBehov))
        .concat(addHvis(Kolonne.TOLKESPRAK, filtrertPaTolkBehov))
        .concat(addHvis(Kolonne.TOLKEBEHOV_SIST_OPPDATERT, filtrertPaTolkBehov))
        .concat(addHvis(Kolonne.YTELSE_ARENA_VURDERINGSFRIST_AAP, filtrertPaAAPMedVurderingsfrist))
        .concat(addHvis(Kolonne.YTELSE_ARENA_YTELSESTYPE_AAP, filtrertPaBeggeAapArenaOgIkkeAapKelvin))
        .concat(addHvis(Kolonne.YTELSE_ARENA_VEDTAKSPERIODE_AAP, filtrertPaAAPMedVedtaksperiode))
        .concat(addHvis(Kolonne.YTELSE_ARENA_RETTIGHETSPERIODE_AAP, filtrertPaAAPMedRettighetsperiode))
        .concat(addHvis(Kolonne.AAP_KELVIN_TOM_VEDTAKSDATO, filtertPaAapIKelvin))
        .concat(addHvis(Kolonne.AAP_KELVIN_RETTIGHET, filtertPaAapIKelvin))
        .concat(addHvis(Kolonne.YTELSE_ARENA_YTELSESTYPE_AAP, filtrertPaBeggeAapArenaOgAapKelvin))
        .concat(addHvis(Kolonne.TILTAKSPENGER_VEDTAKSDATO_TOM, filtrertPaTiltakspenger))
        .concat(addHvis(Kolonne.TILTAKSPENGER_RETTIGHET, filtrertPaTiltakspenger))
        .concat(addHvis(Kolonne.DAGPENGER_PLANGLAGT_STANS, filtrertPaDagpenger))
        .concat(addHvis(Kolonne.DAGPENGER_ANTALL_RESTERENDE_DAGER, filtrertPaDagpenger))
        .concat(addHvis(Kolonne.DAGPENGER_RETTIGHETSTYPE, filtrertPaDagpenger))
        .concat(addHvis(Kolonne.VEILEDER, erPaEnhetensOversiktOgIkkeFiltrertPaMoterIDag))
        .concat(addHvis(Kolonne.YTELSE_ARENA_VURDERINGSFRIST_AAP, filtrertPaAAPUtenVurderingsfrist))
        .concat(addHvis(Kolonne.YTELSE_ARENA_VEDTAKSPERIODE_AAP, filtrertPaBareOrdinarAapArena))
        .concat(addHvis(Kolonne.YTELSE_ARENA_RETTIGHETSPERIODE_AAP, filtrertPaBareAapUnntakArena))
        .concat(addHvis(Kolonne.ENSLIGE_FORSORGERE_UTLOP_OVERGANGSSTONAD, filtrertPaEnsligForsorger))
        .concat(addHvis(Kolonne.ENSLIGE_FORSORGERE_VEDTAKSPERIODE, filtrertPaEnsligForsorger))
        .concat(addHvis(Kolonne.ENSLIGE_FORSORGERE_AKIVITETSPLIKT, filtrertPaEnsligForsorger))
        .concat(addHvis(Kolonne.ENSLIGE_FORSORGERE_OM_BARNET, filtrertPaEnsligForsorger))
        .concat(addHvis(Kolonne.NAVIDENT, erPaEnhetensOversikt))
        .concat(addHvis(Kolonne.CV_SVARFRIST, filtervalg.stillingFraNavFilter.length !== 0))
        .concat(addHvis(Kolonne.BOSTED_SIST_OPPDATERT, filtrertPaGeografiskBosted))
        .concat(addHvis(Kolonne.BARN_UNDER_18_AAR, filtrertPaBarnUnder18Ar))
        .concat(addHvis(Kolonne.UTDANNING_OG_SITUASJON_SIST_ENDRET, filtrertPaUtdanningEllerSituasjonSomKanHaEndring))
        .concat(addHvis(Kolonne.HUSKELAPP_KOMMENTAR, filtrertPaHuskelapp))
        .concat(addHvis(Kolonne.HUSKELAPP_FRIST, filtrertPaHuskelapp))
        .concat(addHvis(Kolonne.HUSKELAPP_SIST_ENDRET, filtrertPaHuskelapp))
        .concat(addHvis(Kolonne.GJELDENDE_VEDTAK_14A_INNSATSGRUPPE, filtrertPaEtGjeldendeVedtak14aFilter))
        .concat(addHvis(Kolonne.GJELDENDE_VEDTAK_14A_HOVEDMAL, filtrertPaEtGjeldendeVedtak14aFilter))
        .concat(addHvis(Kolonne.GJELDENDE_VEDTAK_14A_VEDTAKSDATO, filtrertPaEtGjeldendeVedtak14aFilter))
        .concat([Kolonne.OPPFOLGING_STARTET])
        .concat([Kolonne.TILDELT_TIDSPUNKT]);
}
