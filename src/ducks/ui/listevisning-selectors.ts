import {AppState} from '../../reducer';
import {Kolonne, ListevisningState, ListevisningType} from './listevisning';
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

export function selectMuligeAlternativer(state: AppState, name: string): Kolonne[] {
    if (name === ListevisningType.minOversikt) {
        return state.ui.listevisningMinOversikt.mulige;
    }
    return state.ui.listevisningEnhetensOversikt.mulige;
}

export function selectValgteAlternativer(state: AppState, name: string): Kolonne[] {
    if (name === ListevisningType.minOversikt) {
        return state.ui.listevisningMinOversikt.valgte;
    }
    return state.ui.listevisningEnhetensOversikt.valgte;
}

export function selectListeVisning(state: AppState, name: string): ListevisningState {
    if (name === ListevisningType.minOversikt) {
        return state.ui.listevisningMinOversikt;
    }
    return state.ui.listevisningEnhetensOversikt;
}

function addHvis(kolonne: Kolonne, add: boolean): Kolonne[] {
    return add ? [kolonne] : [];
}

function harValgtMinstEnAktivitet(aktiviteter?: FiltreringAktiviteterValg): boolean {
    return (
        !!aktiviteter && Object.entries(aktiviteter).filter(([_, value]) => value === AktiviteterValg.JA).length >= 1
    );
}

function harIkkeValgtTiltakstype(tiltakstyper: string[]): boolean {
    return tiltakstyper.length === 0;
}

export function getFiltertingState(state: AppState, name: ListevisningType): FiltervalgModell {
    switch (name) {
        case ListevisningType.enhetensOversikt:
            return state.filtreringEnhetensOversikt;
        case ListevisningType.minOversikt:
            return state.filtreringMinoversikt;
        case ListevisningType.veilederOversikt:
            return state.filtreringVeilederoversikt;
    }
}

export function getMuligeKolonner(filtervalg: FiltervalgModell, name: ListevisningType): Kolonne[] {
    return ([] as Kolonne[])
        .concat(addHvis(Kolonne.MOTER_IDAG, filtervalg.ferdigfilterListe.includes(MOTER_IDAG)))
        .concat(addHvis(Kolonne.MOTER_VARIGHET, filtervalg.ferdigfilterListe.includes(MOTER_IDAG)))
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
        .concat(
            addHvis(
                Kolonne.UTLOP_AKTIVITET,
                !filtervalg.ferdigfilterListe.includes(I_AVTALT_AKTIVITET) &&
                    harValgtMinstEnAktivitet(filtervalg.aktiviteter) &&
                    harIkkeValgtTiltakstype(filtervalg.tiltakstyper)
            )
        )
        .concat(
            addHvis(
                Kolonne.START_DATO_AKTIVITET,
                name === ListevisningType.minOversikt && filtervalg.ferdigfilterListe.includes(I_AVTALT_AKTIVITET)
            )
        )
        .concat(
            addHvis(
                Kolonne.NESTE_START_DATO_AKTIVITET,
                name === ListevisningType.minOversikt && filtervalg.ferdigfilterListe.includes(I_AVTALT_AKTIVITET)
            )
        )
        .concat(
            addHvis(
                Kolonne.FORRIGE_START_DATO_AKTIVITET,
                name === ListevisningType.minOversikt && filtervalg.ferdigfilterListe.includes(I_AVTALT_AKTIVITET)
            )
        )
        .concat(
            addHvis(
                Kolonne.ARBEIDSLISTE_FRIST,
                name === ListevisningType.minOversikt && filtervalg.ferdigfilterListe.includes(MIN_ARBEIDSLISTE)
            )
        )
        .concat(
            addHvis(
                Kolonne.ARBEIDSLISTE_OVERSKRIFT,
                name === ListevisningType.minOversikt && filtervalg.ferdigfilterListe.includes(MIN_ARBEIDSLISTE)
            )
        )
        .concat(addHvis(Kolonne.VEILEDER, name === ListevisningType.enhetensOversikt))
        .concat(addHvis(Kolonne.NAVIDENT, name === ListevisningType.enhetensOversikt))
        .concat([Kolonne.OPPFOLGINGSTARTET])
        .concat(addHvis(Kolonne.SISTE_ENDRING, filtervalg.sisteEndringKategori.length > 0))
        .concat(addHvis(Kolonne.SISTE_ENDRING_DATO, filtervalg.sisteEndringKategori.length > 0));
}
