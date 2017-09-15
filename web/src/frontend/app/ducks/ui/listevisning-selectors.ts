import {AppState} from '../../reducer';
import {Kolonne} from './listevisning';
import {AktiviteterValg, FiltreringState} from '../filtrering';

export function selectMuligeAlternativer(state: AppState): Kolonne[] {
    return state.ui.listevisning.mulige;
}

export function selectValgteVisning(state: AppState): Kolonne[] {
    return state.ui.listevisning.valgte;
}

function addHvis(kolonne: Kolonne, add: boolean): Kolonne[] {
    return add ? [kolonne] : [];
}

export function getMuligeKolonner(state: AppState): Kolonne[] {
    const filtervalg: FiltreringState = state.filtrering;
    return [Kolonne.BRUKER, Kolonne.FODSELSNR, Kolonne.VEILEDER, Kolonne.NAVIDENT]
        .concat(addHvis(Kolonne.VENTER_SVAR, filtervalg.tiltakstyper.length > 0))
        .concat(addHvis(Kolonne.UTLOP_YTELSE, filtervalg.ytelse !== null))
        .concat(addHvis(Kolonne.UTLOP_AKTIVITET, Object.entries(filtervalg.aktiviteter)
            .some(([key, value]) => value === AktiviteterValg.JA)));
}
