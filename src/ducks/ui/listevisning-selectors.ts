import {AppState} from '../../reducer';
import {Kolonne, ListevisningState, OversiktType} from './listevisning';
import {AktiviteterValg, FiltreringAktiviteterValg} from '../filtrering';
import {
    AAP_YTELSE,
    AAP_YTELSE_MAXTID,
    AAP_YTELSE_UNNTAK,
    DAGPENGER_YTELSE,
    DAGPENGER_YTELSE_LONNSGARANTIMIDLER,
    DAGPENGER_YTELSE_ORDINARE,
    DAGPENGER_YTELSE_PERMITTERING,
    DAGPENGER_YTELSE_PERMITTERING_FISKEINDUSTRI,
    HAR_AVVIK,
    HUSKELAPP,
    I_AVTALT_AKTIVITET,
    MIN_ARBEIDSLISTE,
    MOTER_IDAG,
    TILTAKSPENGER_YTELSE,
    UNDER_VURDERING,
    UTLOPTE_AKTIVITETER,
    VENTER_PA_SVAR_FRA_BRUKER,
    VENTER_PA_SVAR_FRA_NAV
} from '../../filtrering/filter-konstanter';
import {FiltervalgModell} from '../../model-interfaces';
import {VIS_AAP_VURDERINGSFRISTKOLONNER as AAP_VURDERINGSFRIST_TOGGLE} from '../../konstanter';
import {store} from '../../application';

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

function harValgtMinstEnAktivitet(aktiviteter: FiltreringAktiviteterValg): boolean {
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
    const featureAAPkolonne = store.getState().features[AAP_VURDERINGSFRIST_TOGGLE];

    const filtrertPaLandgruppeEllerFoedeland = filtervalg.landgruppe.length > 0 || filtervalg.foedeland.length > 0;

    const filtrertPaGeografiskBosted =
        filtervalg.geografiskBosted.length > 0 || filtervalg.visGeografiskBosted.length > 0;

    const filtrertPaSisteEndringKategori = filtervalg.sisteEndringKategori.length > 0;

    const filtrertPaMoterIDag = filtervalg.ferdigfilterListe.includes(MOTER_IDAG);

    const filtrertPaVenterSvarFraNavEllerBruker =
        filtervalg.ferdigfilterListe.includes(VENTER_PA_SVAR_FRA_BRUKER) ||
        filtervalg.ferdigfilterListe.includes(VENTER_PA_SVAR_FRA_NAV);

    const filtrertPaUnderVurdering = filtervalg.ferdigfilterListe.includes(UNDER_VURDERING);

    const filtrertPaYtelseMedDagpengerettigheter =
        filtervalg.ytelse === DAGPENGER_YTELSE ||
        filtervalg.ytelse === DAGPENGER_YTELSE_ORDINARE ||
        filtervalg.ytelse === DAGPENGER_YTELSE_PERMITTERING ||
        filtervalg.ytelse === DAGPENGER_YTELSE_PERMITTERING_FISKEINDUSTRI ||
        filtervalg.ytelse === DAGPENGER_YTELSE_LONNSGARANTIMIDLER;

    const avansertAktivitetErValgt =
        !filtervalg.ferdigfilterListe.includes(I_AVTALT_AKTIVITET) &&
        harValgtMinstEnAktivitet(filtervalg.aktiviteter!) &&
        filtervalg.tiltakstyper.length === 0;

    const forenkletAktivitetErValgt =
        (!filtervalg.ferdigfilterListe.includes(I_AVTALT_AKTIVITET) && filtervalg.aktiviteterForenklet.length > 0) ||
        filtervalg.tiltakstyper.length > 0;

    const filtrertPaIAvtaltAktivitetIMinOversikt =
        oversiktType === OversiktType.minOversikt && filtervalg.ferdigfilterListe.includes(I_AVTALT_AKTIVITET);

    const filtrertPaArbeidslisteIMinOversikt =
        oversiktType === OversiktType.minOversikt && filtervalg.ferdigfilterListe.includes(MIN_ARBEIDSLISTE);

    const filtrertPaTolkBehov =
        filtervalg.tolkebehov.length > 0 ||
        (filtervalg.tolkBehovSpraak !== undefined &&
            filtervalg.tolkBehovSpraak !== null &&
            filtervalg.tolkBehovSpraak.length > 0);

    const filtrertPaAvvik14aVedtak = filtervalg.avvik14aVedtak.includes(HAR_AVVIK);

    const filtrertPaYtelseMedVurderingsfrist =
        featureAAPkolonne && (filtervalg.ytelse === AAP_YTELSE_MAXTID || filtervalg.ytelse === AAP_YTELSE_UNNTAK);

    const filtrertPaAAPYtelse = featureAAPkolonne && filtervalg.ytelse === AAP_YTELSE;

    const filtrertPaYtelseMedVedtaksperiode =
        filtervalg.ytelse === AAP_YTELSE || filtervalg.ytelse === AAP_YTELSE_UNNTAK;

    const filtrertPaYtelseMedRettighetsperiode =
        filtervalg.ytelse === AAP_YTELSE || filtervalg.ytelse === AAP_YTELSE_MAXTID;

    const ikkeFiltrertPaMoterIDagIMinOversikt = oversiktType === OversiktType.enhetensOversikt && !filtrertPaMoterIDag;

    const filtrertPaEnsligForsorger = !!filtervalg.ensligeForsorgere.length;

    const filtrertPaBarnUnder18Ar = !!filtervalg.barnUnder18Aar.length || !!filtervalg.barnUnder18AarAlder.length;

    const filtrertPaUtdanningEllerSituasjonSomKanHaEndring =
        filtervalg.registreringstype?.length > 0 ||
        filtervalg.utdanning.length > 0 ||
        filtervalg.utdanningGodkjent.length > 0 ||
        filtervalg.utdanningBestatt.length > 0;

    const filtrertPaHuskelapp = filtervalg.ferdigfilterListe.includes(HUSKELAPP);

    return ([] as Kolonne[])
        .concat(addHvis(Kolonne.FODELAND, filtrertPaLandgruppeEllerFoedeland))
        .concat(addHvis(Kolonne.STATSBORGERSKAP, filtrertPaLandgruppeEllerFoedeland))
        .concat(addHvis(Kolonne.STATSBORGERSKAP_GYLDIG_FRA, filtrertPaLandgruppeEllerFoedeland))
        .concat(addHvis(Kolonne.BOSTED_KOMMUNE, filtrertPaGeografiskBosted))
        .concat(addHvis(Kolonne.BOSTED_BYDEL, filtrertPaGeografiskBosted))
        .concat(addHvis(Kolonne.SISTE_ENDRING, filtrertPaSisteEndringKategori))
        .concat(addHvis(Kolonne.SISTE_ENDRING_DATO, filtrertPaSisteEndringKategori))
        .concat(addHvis(Kolonne.MOTER_IDAG, filtrertPaMoterIDag))
        .concat(addHvis(Kolonne.VEILEDER, filtrertPaMoterIDag && oversiktType === OversiktType.enhetensOversikt))
        .concat(addHvis(Kolonne.MOTER_VARIGHET, filtrertPaMoterIDag))
        .concat(addHvis(Kolonne.MOTE_ER_AVTALT, filtrertPaMoterIDag))
        .concat(addHvis(Kolonne.UTLOPTE_AKTIVITETER, filtervalg.ferdigfilterListe.includes(UTLOPTE_AKTIVITETER)))
        .concat(addHvis(Kolonne.AVTALT_AKTIVITET, filtervalg.ferdigfilterListe.includes(I_AVTALT_AKTIVITET)))
        .concat(addHvis(Kolonne.VENTER_SVAR, filtrertPaVenterSvarFraNavEllerBruker))
        .concat(addHvis(Kolonne.VEDTAKSTATUS, filtrertPaUnderVurdering))
        .concat(addHvis(Kolonne.VEDTAKSTATUS_ENDRET, filtrertPaUnderVurdering))
        .concat(addHvis(Kolonne.ANSVARLIG_VEILEDER_FOR_VEDTAK, filtrertPaUnderVurdering))
        .concat(addHvis(Kolonne.GJENSTAENDE_UKER_RETTIGHET_DAGPENGER, filtrertPaYtelseMedDagpengerettigheter))
        .concat(addHvis(Kolonne.GJENSTAENDE_UKER_VEDTAK_TILTAKSPENGER, filtervalg.ytelse === TILTAKSPENGER_YTELSE))
        .concat(addHvis(Kolonne.UTLOP_AKTIVITET, avansertAktivitetErValgt || forenkletAktivitetErValgt))
        .concat(addHvis(Kolonne.START_DATO_AKTIVITET, filtrertPaIAvtaltAktivitetIMinOversikt))
        .concat(addHvis(Kolonne.NESTE_START_DATO_AKTIVITET, filtrertPaIAvtaltAktivitetIMinOversikt))
        .concat(addHvis(Kolonne.FORRIGE_START_DATO_AKTIVITET, filtrertPaIAvtaltAktivitetIMinOversikt))
        .concat(addHvis(Kolonne.ARBEIDSLISTE_FRIST, filtrertPaArbeidslisteIMinOversikt))
        .concat(addHvis(Kolonne.ARBEIDSLISTE_OVERSKRIFT, filtrertPaArbeidslisteIMinOversikt))
        .concat(addHvis(Kolonne.TOLKEBEHOV, filtrertPaTolkBehov))
        .concat(addHvis(Kolonne.TOLKEBEHOV_SPRAAK, filtrertPaTolkBehov))
        .concat(addHvis(Kolonne.TOLKEBEHOV_SIST_OPPDATERT, filtrertPaTolkBehov))
        .concat(addHvis(Kolonne.AVVIK_14A_VEDTAK, filtrertPaAvvik14aVedtak))
        .concat(addHvis(Kolonne.VURDERINGSFRIST_YTELSE, filtrertPaYtelseMedVurderingsfrist))
        .concat(addHvis(Kolonne.TYPE_YTELSE, filtrertPaAAPYtelse))
        .concat(addHvis(Kolonne.VEDTAKSPERIODE, filtrertPaYtelseMedVedtaksperiode))
        .concat(addHvis(Kolonne.RETTIGHETSPERIODE, filtrertPaYtelseMedRettighetsperiode))
        .concat(addHvis(Kolonne.VEILEDER, ikkeFiltrertPaMoterIDagIMinOversikt))
        .concat(addHvis(Kolonne.VURDERINGSFRIST_YTELSE, filtrertPaAAPYtelse))
        .concat(addHvis(Kolonne.VEDTAKSPERIODE, filtervalg.ytelse === AAP_YTELSE_MAXTID))
        .concat(addHvis(Kolonne.RETTIGHETSPERIODE, filtervalg.ytelse === AAP_YTELSE_UNNTAK))
        .concat(addHvis(Kolonne.ENSLIGE_FORSORGERE_UTLOP_OVERGANGSSTONAD, filtrertPaEnsligForsorger))
        .concat(addHvis(Kolonne.ENSLIGE_FORSORGERE_VEDTAKSPERIODE, filtrertPaEnsligForsorger))
        .concat(addHvis(Kolonne.ENSLIGE_FORSORGERE_AKIVITETSPLIKT, filtrertPaEnsligForsorger))
        .concat(addHvis(Kolonne.ENSLIGE_FORSORGERE_OM_BARNET, filtrertPaEnsligForsorger))
        .concat(addHvis(Kolonne.NAVIDENT, oversiktType === OversiktType.enhetensOversikt))
        .concat(addHvis(Kolonne.CV_SVARFRIST, filtervalg.stillingFraNavFilter.length !== 0))
        .concat(addHvis(Kolonne.BOSTED_SIST_OPPDATERT, filtrertPaGeografiskBosted))
        .concat(addHvis(Kolonne.HAR_BARN_UNDER_18, filtrertPaBarnUnder18Ar))
        .concat(addHvis(Kolonne.UTDANNING_OG_SITUASJON_SIST_ENDRET, filtrertPaUtdanningEllerSituasjonSomKanHaEndring))
        .concat(addHvis(Kolonne.HUSKELAPP_KOMMENTAR, filtrertPaHuskelapp))
        .concat(addHvis(Kolonne.HUSKELAPP_FRIST, filtrertPaHuskelapp))
        .concat([Kolonne.OPPFOLGINGSTARTET]);
}
