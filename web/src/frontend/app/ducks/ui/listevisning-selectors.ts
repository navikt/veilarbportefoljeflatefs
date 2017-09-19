import {AppState} from '../../reducer';
import {Kolonne} from './listevisning';
import {FiltreringAktiviteterValg, AktiviteterValg, FiltreringState} from '../filtrering';
import {
    aktiviteter,
    I_AVTALT_AKTIVITET, UTLOPTE_AKTIVITETER, VENTER_PA_SVAR_FRA_BRUKER,
    VENTER_PA_SVAR_FRA_NAV
} from '../../filtrering/filter-konstanter';
import {FiltervalgModell} from '../../model-interfaces';

export function selectMuligeAlternativer(state: AppState): Kolonne[] {
    return state.ui.listevisning.mulige;
}

export function selectValgteAlternativer(state: AppState): Kolonne[] {
    return state.ui.listevisning.valgte;
}

function addHvis(kolonne: Kolonne, add: boolean): Kolonne[] {
    return add ? [kolonne] : [];
}

function harValgtKunEnAktivitet(aktiviteter: FiltreringAktiviteterValg): boolean {
    return Object.entries(aktiviteter)
        .filter(([key, value]) => value === AktiviteterValg.JA)
        .length === 1;
}

function harIkkeValgtTiltakstype(tiltakstyper: string[]): boolean {
    return tiltakstyper.length === 0;
}

export function getMuligeKolonner(state: AppState): Kolonne[] {
    const filtervalg: FiltreringState = state.filtrering;
    return [Kolonne.BRUKER, Kolonne.FODSELSNR, Kolonne.VEILEDER, Kolonne.NAVIDENT]
        .concat(addHvis(Kolonne.UTLOPTE_AKTIVITETER, filtervalg.brukerstatus === UTLOPTE_AKTIVITETER))
        .concat(addHvis(Kolonne.AVTALT_AKTIVITET, filtervalg.brukerstatus === I_AVTALT_AKTIVITET))
        .concat(addHvis(Kolonne.VENTER_SVAR, filtervalg.brukerstatus === VENTER_PA_SVAR_FRA_BRUKER || filtervalg.brukerstatus === VENTER_PA_SVAR_FRA_NAV))
        .concat(addHvis(Kolonne.UTLOP_YTELSE, filtervalg.ytelse !== null))
        .concat(addHvis(Kolonne.UTLOP_AKTIVITET, harValgtKunEnAktivitet(filtervalg.aktiviteter) && harIkkeValgtTiltakstype(filtervalg.tiltakstyper)));
}
