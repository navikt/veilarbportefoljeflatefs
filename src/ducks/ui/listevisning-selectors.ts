import {AppState} from '../../reducer';
import {Kolonne, ListevisningState, OversiktType} from './listevisning';
import {AktiviteterValg, FiltreringAktiviteterValg} from '../filtrering';
import {
    AAP_YTELSE,
    AAP_YTELSE_MAXTID,
    AAP_YTELSE_UNNTAK,
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

    const tolkBehovErValgt = () => {
        return (
            filtervalg.tolkebehov!.length > 0 ||
            (filtervalg.tolkBehovSpraak !== null && filtervalg.tolkBehovSpraak!.length > 0)
        );
    };

    return ([] as Kolonne[])
        .concat(addHvis(Kolonne.FODELAND, filtervalg.landgruppe!.length > 0))
        .concat(addHvis(Kolonne.STATSBORGERSKAP, filtervalg.landgruppe!.length > 0))
        .concat(addHvis(Kolonne.STATSBORGERSKAP_GYLDIG_FRA, filtervalg.landgruppe!.length > 0))
        .concat(addHvis(Kolonne.SISTE_ENDRING, filtervalg.sisteEndringKategori.length > 0))
        .concat(addHvis(Kolonne.SISTE_ENDRING_DATO, filtervalg.sisteEndringKategori.length > 0))
        .concat(addHvis(Kolonne.MOTER_IDAG, filtervalg.ferdigfilterListe.includes(MOTER_IDAG)))
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
        .concat(addHvis(Kolonne.VEILEDER, oversiktType === OversiktType.enhetensOversikt))
        .concat(addHvis(Kolonne.NAVIDENT, oversiktType === OversiktType.enhetensOversikt))
        .concat(addHvis(Kolonne.TOLKEBEHOV, tolkBehovErValgt()))
        .concat(addHvis(Kolonne.TOLKEBEHOV_SPRAAK, tolkBehovErValgt()))
        .concat(addHvis(Kolonne.TOLKEBEHOV_SIST_OPPDATERT, tolkBehovErValgt()))
        .concat([Kolonne.OPPFOLGINGSTARTET]);
}
