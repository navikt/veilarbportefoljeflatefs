enum ActionTypeKeys {
    VELG_ALTERNATIV = 'listevisning/velg_alternativ',
    AVVELG_ALTERNATIV = 'listevisning/avvelg_alternativ',
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

interface OtherAction {
    type: ActionTypeKeys.OTHER_ACTION;
}

type ListevisningActionTypes =
    | ListevisningAction
    | OtherAction;

export interface ListevisningState {
    valgte: Kolonne[];
}

const initialState: ListevisningState = {
    valgte: [Kolonne.BRUKER, Kolonne.FODSELSNR, Kolonne.NAVIDENT, Kolonne.VEILEDER],
};

function addIfNotExists(kolonne: Kolonne, kolonner: Kolonne[]): Kolonne[] {
    if (kolonner.includes(kolonne)) {
        return kolonner;
    }
    return [...kolonner, kolonne];
}

export function listevisningReducer(state = initialState, action: ListevisningActionTypes): ListevisningState {
    switch (action.type) {
        case ActionTypeKeys.VELG_ALTERNATIV:
            return {...state, valgte: addIfNotExists(action.kolonne, state.valgte)};
        case ActionTypeKeys.AVVELG_ALTERNATIV:
            return {...state, valgte: state.valgte.filter((alternativ) => alternativ !== action.kolonne)};
        default:
            return state;
    }
}

export default listevisningReducer;

export const velgAlternativ = (kolonne: Kolonne) => ({type: ActionTypeKeys.VELG_ALTERNATIV, kolonne});
export const avvelgAlternativ = (kolonne: Kolonne) => ({type: ActionTypeKeys.AVVELG_ALTERNATIV, kolonne});
