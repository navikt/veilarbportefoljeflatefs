import {AppState} from '../../reducer';
import {Kolonne, ListevisningState, OversiktType} from './listevisning';
import {AktiviteterValg, FiltreringAktiviteterValg} from '../filtrering';
import {
    AAP_YTELSE,
    AAP_YTELSE_MAXTID,
    AAP_YTELSE_UNNTAK,
    HAR_AVVIK,
    I_AVTALT_AKTIVITET,
    MIN_ARBEIDSLISTE,
    MOTER_IDAG,
    UNDER_VURDERING,
    UTLOPTE_AKTIVITETER,
    VENTER_PA_SVAR_FRA_BRUKER,
    VENTER_PA_SVAR_FRA_NAV
} from '../../filtrering/filter-konstanter';
import {FiltervalgModell} from '../../model-interfaces';

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
    const avansertAktivitetErValgt = () => {
        return (
            !filtervalg.ferdigfilterListe.includes(I_AVTALT_AKTIVITET) &&
            harValgtMinstEnAktivitet(filtervalg.aktiviteter!) &&
            filtervalg.tiltakstyper.length === 0
        );
    };

    const forenkletAktivitetErValgt = () => {
        return (
            (!filtervalg.ferdigfilterListe.includes(I_AVTALT_AKTIVITET) &&
                filtervalg.aktiviteterForenklet.length > 0) ||
            filtervalg.tiltakstyper.length > 0
        );
    };

    const geografiskBostedErValgt = () => {
        return filtervalg.geografiskBosted.length > 0 || filtervalg.visGeografiskBosted.length > 0;
    };

    const tolkBehovErValgt = () => {
        return (
            filtervalg.tolkebehov.length > 0 ||
            (filtervalg.tolkBehovSpraak !== undefined &&
                filtervalg.tolkBehovSpraak !== null &&
                filtervalg.tolkBehovSpraak.length > 0)
        );
    };

    function avvik14aVedtakErValgt() {
        return filtervalg.avvik14aVedtak.includes(HAR_AVVIK);
    }

    return ([] as Kolonne[])
        .concat(addHvis(Kolonne.FODELAND, filtervalg.landgruppe.length > 0 || filtervalg.foedeland.length > 0))
        .concat(addHvis(Kolonne.STATSBORGERSKAP, filtervalg.landgruppe.length > 0 || filtervalg.foedeland.length > 0))
        .concat(
            addHvis(
                Kolonne.STATSBORGERSKAP_GYLDIG_FRA,
                filtervalg.landgruppe.length > 0 || filtervalg.foedeland.length > 0
            )
        )
        .concat(addHvis(Kolonne.BOSTED_KOMMUNE, geografiskBostedErValgt()))
        .concat(addHvis(Kolonne.BOSTED_BYDEL, geografiskBostedErValgt()))
        .concat(addHvis(Kolonne.SISTE_ENDRING, filtervalg.sisteEndringKategori.length > 0))
        .concat(addHvis(Kolonne.SISTE_ENDRING_DATO, filtervalg.sisteEndringKategori.length > 0))
        .concat(addHvis(Kolonne.MOTER_IDAG, filtervalg.ferdigfilterListe.includes(MOTER_IDAG)))
        .concat(
            addHvis(
                Kolonne.VEILEDER,
                filtervalg.ferdigfilterListe.includes(MOTER_IDAG) && oversiktType === OversiktType.enhetensOversikt
            )
        )
        .concat(addHvis(Kolonne.MOTER_VARIGHET, filtervalg.ferdigfilterListe.includes(MOTER_IDAG)))
        .concat(addHvis(Kolonne.MOTE_ER_AVTALT, filtervalg.ferdigfilterListe.includes(MOTER_IDAG)))
        .concat(addHvis(Kolonne.UTLOPTE_AKTIVITETER, filtervalg.ferdigfilterListe.includes(UTLOPTE_AKTIVITETER)))
        .concat(addHvis(Kolonne.AVTALT_AKTIVITET, filtervalg.ferdigfilterListe.includes(I_AVTALT_AKTIVITET)))
        .concat(
            addHvis(
                Kolonne.VENTER_SVAR,
                filtervalg.ferdigfilterListe.includes(VENTER_PA_SVAR_FRA_BRUKER) ||
                    filtervalg.ferdigfilterListe.includes(VENTER_PA_SVAR_FRA_NAV)
            )
        )
        .concat(addHvis(Kolonne.VEDTAKSTATUS, filtervalg.ferdigfilterListe.includes(UNDER_VURDERING)))
        .concat(addHvis(Kolonne.VEDTAKSTATUS_ENDRET, filtervalg.ferdigfilterListe.includes(UNDER_VURDERING)))
        .concat(addHvis(Kolonne.ANSVARLIG_VEILEDER_FOR_VEDTAK, filtervalg.ferdigfilterListe.includes(UNDER_VURDERING)))
        .concat(
            addHvis(
                Kolonne.UTLOP_YTELSE,
                filtervalg.ytelse !== null &&
                    filtervalg.ytelse !== AAP_YTELSE &&
                    filtervalg.ytelse !== AAP_YTELSE_MAXTID &&
                    filtervalg.ytelse !== AAP_YTELSE_UNNTAK
            )
        )
        .concat(
            addHvis(
                Kolonne.VEDTAKSPERIODE,
                filtervalg.ytelse === AAP_YTELSE ||
                    filtervalg.ytelse === AAP_YTELSE_MAXTID ||
                    filtervalg.ytelse === AAP_YTELSE_UNNTAK
            )
        )
        .concat(
            addHvis(
                Kolonne.RETTIGHETSPERIODE,
                filtervalg.ytelse === AAP_YTELSE ||
                    filtervalg.ytelse === AAP_YTELSE_MAXTID ||
                    filtervalg.ytelse === AAP_YTELSE_UNNTAK
            )
        )
        .concat(addHvis(Kolonne.UTLOP_AKTIVITET, avansertAktivitetErValgt() || forenkletAktivitetErValgt()))
        .concat(
            addHvis(
                Kolonne.START_DATO_AKTIVITET,
                oversiktType === OversiktType.minOversikt && filtervalg.ferdigfilterListe.includes(I_AVTALT_AKTIVITET)
            )
        )
        .concat(
            addHvis(
                Kolonne.NESTE_START_DATO_AKTIVITET,
                oversiktType === OversiktType.minOversikt && filtervalg.ferdigfilterListe.includes(I_AVTALT_AKTIVITET)
            )
        )
        .concat(
            addHvis(
                Kolonne.FORRIGE_START_DATO_AKTIVITET,
                oversiktType === OversiktType.minOversikt && filtervalg.ferdigfilterListe.includes(I_AVTALT_AKTIVITET)
            )
        )
        .concat(
            addHvis(
                Kolonne.ARBEIDSLISTE_FRIST,
                oversiktType === OversiktType.minOversikt && filtervalg.ferdigfilterListe.includes(MIN_ARBEIDSLISTE)
            )
        )
        .concat(
            addHvis(
                Kolonne.ARBEIDSLISTE_OVERSKRIFT,
                oversiktType === OversiktType.minOversikt && filtervalg.ferdigfilterListe.includes(MIN_ARBEIDSLISTE)
            )
        )
        .concat(addHvis(Kolonne.TOLKEBEHOV, tolkBehovErValgt()))
        .concat(addHvis(Kolonne.TOLKEBEHOV_SPRAAK, tolkBehovErValgt()))
        .concat(addHvis(Kolonne.TOLKEBEHOV_SIST_OPPDATERT, tolkBehovErValgt()))
        .concat(addHvis(Kolonne.AVVIK_14A_VEDTAK, avvik14aVedtakErValgt()))
        .concat(
            addHvis(
                Kolonne.VEILEDER,
                oversiktType === OversiktType.enhetensOversikt && !filtervalg.ferdigfilterListe.includes(MOTER_IDAG)
            )
        )
        .concat(addHvis(Kolonne.UTLOP_YTELSE, !!filtervalg.ensligeForsorgere.length))
        .concat(addHvis(Kolonne.ENSLIGE_FORSORGERE_VEDTAKSPERIODE, !!filtervalg.ensligeForsorgere.length))
        .concat(addHvis(Kolonne.ENSLIGE_FORSORGERE_AKIVITETSPLIKT, !!filtervalg.ensligeForsorgere.length))
        .concat(addHvis(Kolonne.ENSLIGE_FORSORGERE_OM_BARNET, !!filtervalg.ensligeForsorgere.length))
        .concat(addHvis(Kolonne.NAVIDENT, oversiktType === OversiktType.enhetensOversikt))
        .concat(addHvis(Kolonne.CV_SVARFRIST, filtervalg.stillingFraNavFilter.length !== 0))
        .concat(addHvis(Kolonne.BOSTED_SIST_OPPDATERT, geografiskBostedErValgt()))
        .concat([Kolonne.OPPFOLGINGSTARTET]);
}
