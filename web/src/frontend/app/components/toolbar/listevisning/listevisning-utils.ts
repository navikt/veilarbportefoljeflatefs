import {Kolonne} from '../../../ducks/ui/listevisning';
import {AktiviteterValg, FiltreringState} from '../../../ducks/filtrering';
import {AppState} from "../../../reducer";

export interface Alternativ {
    tekstid: string;
    checkboxDisabled?: boolean;
}

function addHvis(kolonne: Kolonne, add: boolean): Kolonne[] {
    return add ? [kolonne] : [];
}

export function selectMuligeAlternativer(state: AppState): Kolonne[] {
    return getMuligeKolonner(state.filtrering);
}

export function selectValgteAlternativer(state: AppState): Kolonne[] {
    const muligeAlternativer = selectMuligeAlternativer(state);
    if (muligeAlternativer.length <= 5) {
        return muligeAlternativer;
    }
    return state.ui.listevisning.valgte.filter(a => muligeAlternativer.includes(a));
}

export const alternativerConfig = new Map<Kolonne, Alternativ>();
alternativerConfig.set(Kolonne.BRUKER, {tekstid: 'listevisning.valg.bruker', checkboxDisabled: true});
alternativerConfig.set(Kolonne.FODSELSNR, {tekstid: 'listevisning.valg.fodselsnr', checkboxDisabled: true});
alternativerConfig.set(Kolonne.VEILEDER, {tekstid: 'listevisning.valg.veileder'});
alternativerConfig.set(Kolonne.NAVIDENT, {tekstid: 'listevisning.valg.navident'});
alternativerConfig.set(Kolonne.VENTER_SVAR, {tekstid: 'listevisning.valg.ventersvar'});
alternativerConfig.set(Kolonne.UTLOP_YTELSE, {tekstid: 'listevisning.valg.utlopytelse'});
alternativerConfig.set(Kolonne.UTLOP_AKTIVITET, {tekstid: 'listevisning.valg.utlopaktivitet'});

export function getMuligeKolonner(filtervalg: FiltreringState): Kolonne[] {
    return [Kolonne.BRUKER, Kolonne.FODSELSNR, Kolonne.VEILEDER, Kolonne.NAVIDENT]
        .concat(addHvis(Kolonne.VENTER_SVAR, filtervalg.tiltakstyper.length > 0))
        .concat(addHvis(Kolonne.UTLOP_YTELSE, filtervalg.ytelse !== null))
        .concat(addHvis(Kolonne.UTLOP_AKTIVITET, Object.entries(filtervalg.aktiviteter)
            .some(([key, value]) => value === AktiviteterValg.JA)));
}
