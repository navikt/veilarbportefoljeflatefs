import {Dispatch} from 'redux';
import {AppState} from '../../reducer';
import {selectMuligeAlternativer, selectValgteAlternativer, getMuligeKolonner} from './listevisning-selectors';

enum ActionTypeKeys {
    VELG_ALTERNATIV = 'listevisning/velg_alternativ',
    AVVELG_ALTERNATIV = 'listevisning/avvelg_alternativ',
    OPPDATER_VALGTE_ALTERNATIV = 'listevisning/oppdater_valgte_alternativ',
    OPPDATER_MULIGE_ALTERNATIV = 'listevisning/oppdater_mulige_alternativ',
    OTHER_ACTION = '__OTHER_ACTION__'
}

export enum Kolonne {
    BRUKER = 'bruker',
    FODSELSNR = 'fodselsnr',
    VEILEDER = 'veileder',
    NAVIDENT = 'navident',
    VENTER_SVAR = 'ventersvar',
    UTLOP_YTELSE = 'utlopytelse',
    UTLOP_AKTIVITET = 'utlopaktivitet'
}

interface ListevisningAction {
    type: ActionTypeKeys.VELG_ALTERNATIV | ActionTypeKeys.AVVELG_ALTERNATIV;
    kolonne: Kolonne;
}

interface OppdaterListevisningAction {
    type: ActionTypeKeys.OPPDATER_VALGTE_ALTERNATIV | ActionTypeKeys.OPPDATER_MULIGE_ALTERNATIV;
    kolonner: Kolonne[];
}

interface OtherAction {
    type: ActionTypeKeys.OTHER_ACTION;
}

type ListevisningActions =
    | ListevisningAction
    | OppdaterListevisningAction
    | OtherAction;

export interface ListevisningState {
    valgte: Kolonne[];
    mulige: Kolonne[];
}

export const initialState: ListevisningState = {
    valgte: [Kolonne.BRUKER, Kolonne.FODSELSNR, Kolonne.NAVIDENT, Kolonne.VEILEDER],
    mulige: [Kolonne.BRUKER, Kolonne.FODSELSNR, Kolonne.NAVIDENT, Kolonne.VEILEDER]
};

function addIfNotExists(kolonne: Kolonne, kolonner: Kolonne[]): Kolonne[] {
    if (kolonner.includes(kolonne)) {
        return kolonner;
    }
    return [...kolonner, kolonne];
}

export function listevisningReducer(state = initialState, action: ListevisningActions): ListevisningState {
    switch (action.type) {
        case ActionTypeKeys.VELG_ALTERNATIV:
            return {...state, valgte: addIfNotExists(action.kolonne, state.valgte)};
        case ActionTypeKeys.AVVELG_ALTERNATIV:
            return {...state, valgte: state.valgte.filter((alternativ) => alternativ !== action.kolonne)};
        case ActionTypeKeys.OPPDATER_VALGTE_ALTERNATIV:
            return {...state, valgte: action.kolonner};
        case ActionTypeKeys.OPPDATER_MULIGE_ALTERNATIV:
            return {...state, mulige: action.kolonner};
        default:
            return state;
    }
}

export default listevisningReducer;

export const velgAlternativ = (kolonne: Kolonne) => ({type: ActionTypeKeys.VELG_ALTERNATIV, kolonne});
export const avvelgAlternativ = (kolonne: Kolonne) => ({type: ActionTypeKeys.AVVELG_ALTERNATIV, kolonne});

export const oppdaterAlternativer = (dispatch: Dispatch<OppdaterListevisningAction>, getState: () => AppState) => {
    const appState = getState();
    const muligeAlternativer = selectMuligeAlternativer(appState);
    const valgteAlternativer = selectValgteAlternativer(appState);
    const nyeMuligeAlternativer = getMuligeKolonner(appState);

    dispatch({
        type: ActionTypeKeys.OPPDATER_MULIGE_ALTERNATIV,
        kolonner: nyeMuligeAlternativer
    });

    if(nyeMuligeAlternativer.length <= 5) {
        dispatch({
            type: ActionTypeKeys.OPPDATER_VALGTE_ALTERNATIV,
            kolonner: nyeMuligeAlternativer
        });
    } else {
        dispatch({
            type: ActionTypeKeys.OPPDATER_VALGTE_ALTERNATIV,
            kolonner: valgteAlternativer
                .filter((alternativ) => nyeMuligeAlternativer.includes(alternativ))
                .concat(nyeMuligeAlternativer.filter((alternativ) => !muligeAlternativer.includes(alternativ)))
                .slice(0, 5)
        });
    }
};
