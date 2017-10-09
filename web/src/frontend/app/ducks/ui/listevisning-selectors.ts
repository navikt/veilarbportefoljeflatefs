import { AppState } from '../../reducer';
import { Kolonne, ListevisningType } from './listevisning';
import { FiltreringAktiviteterValg, AktiviteterValg, FiltreringState } from '../filtrering';
import {
    I_AVTALT_AKTIVITET, UTLOPTE_AKTIVITETER, VENTER_PA_SVAR_FRA_BRUKER,
    VENTER_PA_SVAR_FRA_NAV
} from '../../filtrering/filter-konstanter';

export function selectMuligeAlternativer(state: AppState, name: ListevisningType): Kolonne[] {
    if (name === ListevisningType.minOversikt) {
        return state.ui.listevisningMinOversikt.mulige;
    }
    return state.ui.listevisningEnhetensOversikt.mulige;
}

export function selectValgteAlternativer(state: AppState, name: ListevisningType): Kolonne[] {
    if (name === ListevisningType.minOversikt) {
        return state.ui.listevisningMinOversikt.valgte;
    }
    return state.ui.listevisningEnhetensOversikt.valgte;
}

function addHvis(kolonne: Kolonne, add: boolean): Kolonne[] {
    return add ? [kolonne] : [];
}

function harValgtMinstEnAktivitet(aktiviteter: FiltreringAktiviteterValg): boolean {
    return Object.entries(aktiviteter)
        .filter(([key, value]) => value === AktiviteterValg.JA)
        .length >= 1;
}

function harIkkeValgtTiltakstype(tiltakstyper: string[]): boolean {
    return tiltakstyper.length === 0;
}

export function getMuligeKolonner(state: AppState, name: ListevisningType): Kolonne[] {
    const filtervalg: FiltreringState = state.filtrering;
    return [Kolonne.BRUKER, Kolonne.FODSELSNR]
        .concat(addHvis(Kolonne.VEILEDER, name === ListevisningType.enhetensOversikt))
        .concat(addHvis(Kolonne.NAVIDENT, name === ListevisningType.enhetensOversikt))
        .concat(addHvis(Kolonne.UTLOPTE_AKTIVITETER, filtervalg.brukerstatus === UTLOPTE_AKTIVITETER))
        .concat(addHvis(Kolonne.AVTALT_AKTIVITET, filtervalg.brukerstatus === I_AVTALT_AKTIVITET))
        .concat(addHvis(Kolonne.VENTER_SVAR, filtervalg.brukerstatus === VENTER_PA_SVAR_FRA_BRUKER || filtervalg.brukerstatus === VENTER_PA_SVAR_FRA_NAV))
        .concat(addHvis(Kolonne.UTLOP_YTELSE, filtervalg.ytelse !== null))
        .concat(addHvis(Kolonne.UTLOP_AKTIVITET, harValgtMinstEnAktivitet(filtervalg.aktiviteter) && harIkkeValgtTiltakstype(filtervalg.tiltakstyper)));
}
