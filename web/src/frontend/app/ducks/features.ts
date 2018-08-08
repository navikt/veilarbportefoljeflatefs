import { AppState } from '../reducer';
import { hentFeature } from '../middleware/api';

const ADD_FEATURE = 'veilarbportefoljeflatefs/features/ADD_FEATURE';

export interface FeaturesState {
    [feature: string]: boolean;
}

const initalState: FeaturesState = {};

// Reducer
export default function reducer(state: FeaturesState = initalState, action): FeaturesState {
    switch (action.type) {
        case ADD_FEATURE:
            return {
                ...state,
                ...action.features
            };
        default:
            return state;
    }
}

// Action Creators
export function hentFeatureFraUnleash(feature: string) {
    return (dispatch) => {
        hentFeature(feature)
            .then((json) => dispatch({
                type: ADD_FEATURE,
                features: json
            }));
    };
}

export function sjekkFeature(state: AppState, feature: string): boolean {
    return state.features[feature] === true;
}
