import {AppState} from '../../reducer';
import {Kolonne} from './listevisning';
import {AktiviteterValg, FiltreringState} from '../filtrering';
import {
    I_AVTALT_AKTIVITET, UTLOPTE_AKTIVITETER, VENTER_PA_SVAR_FRA_BRUKER,
    VENTER_PA_SVAR_FRA_NAV
} from '../../filtrering/filter-konstanter';

export function selectMuligeAlternativer(state: AppState): Kolonne[] {
    return state.ui.listevisning.mulige;
}

export function selectValgteAlternativer(state: AppState): Kolonne[] {
    return state.ui.listevisning.valgte;
}

function addHvis(kolonne: Kolonne, add: boolean): Kolonne[] {
    return add ? [kolonne] : [];
}

export function getMuligeKolonner(state: AppState): Kolonne[] {
    const filtervalg: FiltreringState = state.filtrering;
    return [Kolonne.BRUKER, Kolonne.FODSELSNR, Kolonne.VEILEDER, Kolonne.NAVIDENT]
        .concat(addHvis(Kolonne.UTLOPTE_AKTIVITETER, filtervalg.brukerstatus === UTLOPTE_AKTIVITETER))
        .concat(addHvis(Kolonne.AVTALT_AKTIVITET, filtervalg.brukerstatus === I_AVTALT_AKTIVITET))
        .concat(addHvis(Kolonne.VENTER_SVAR, filtervalg.brukerstatus === VENTER_PA_SVAR_FRA_BRUKER || filtervalg.brukerstatus === VENTER_PA_SVAR_FRA_NAV))
        .concat(addHvis(Kolonne.UTLOP_YTELSE, filtervalg.ytelse !== null))
        .concat(addHvis(Kolonne.UTLOP_AKTIVITET, Object.entries(filtervalg.aktiviteter)
            .some(([key, value]) => value === AktiviteterValg.JA)));
}
