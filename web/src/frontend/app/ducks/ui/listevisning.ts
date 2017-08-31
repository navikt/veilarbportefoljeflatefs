enum ActionTypeKeys {
    VELG_ALTERNATIV = 'listevisning/velg_alternativ',
    AVVELG_ALTERNATIV = 'listevisning/avvelg_alternativ',
    OTHER_ACTION = '__OTHER_ACTION__'
}

interface VelgEllerAvvelgAction {
    type: ActionTypeKeys.VELG_ALTERNATIV | ActionTypeKeys.AVVELG_ALTERNATIV;
    alternativ: string;
}

interface OtherAction {
    type: ActionTypeKeys.OTHER_ACTION;
}

type ListevisningActionTypes =
    | VelgEllerAvvelgAction
    | OtherAction;

export interface ListevisningState {
    valgte: string[];
}

const initialState: ListevisningState = {
    valgte: ['bruker', 'fodselsnr']
};

export function listevisningReducer(state = initialState, action: ListevisningActionTypes): ListevisningState {
    switch (action.type) {
        case ActionTypeKeys.VELG_ALTERNATIV:
            return { valgte: state.valgte.concat(action.alternativ) };
        case ActionTypeKeys.AVVELG_ALTERNATIV:
            return { valgte: state.valgte.filter((alternativ) => alternativ !== action.alternativ) };
        default:
            return state;
    }
}

export default listevisningReducer;

export const velgAlternativ = (alternativ: string) => ({ type: ActionTypeKeys.VELG_ALTERNATIV, alternativ });
export const avvelgAlternativ = (alternativ: string) => ({ type: ActionTypeKeys.AVVELG_ALTERNATIV, alternativ });
