export interface FeatureToggleState {
}

export const initialState: FeatureToggleState = {
};

enum FeatureToggleActionNames {
    TOGGLE_FEATURE = 'feature/toggle',
    OTHER_ACTION = '__otheraction__'
}

interface FeatureToggleAction {
    type: FeatureToggleActionNames.TOGGLE_FEATURE;
    navn: string;
    aktivert: boolean;
}

interface OtherAction {
    type: FeatureToggleActionNames.OTHER_ACTION;
}

type FeatureToggleActions =
    | FeatureToggleAction
    | OtherAction;

export function featureToggleReducer(state: FeatureToggleState = initialState, action: FeatureToggleActions) {
    switch (action.type) {
        case FeatureToggleActionNames.TOGGLE_FEATURE:
            return { ...state, [action.navn]: action.aktivert };
        default:
            return state;
    }
}

export const settFeatureState = (navn: string, aktivert: boolean): FeatureToggleAction => {
    return {
        type: FeatureToggleActionNames.TOGGLE_FEATURE,
        navn,
        aktivert
    };
};
