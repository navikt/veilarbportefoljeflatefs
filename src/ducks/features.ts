import {AppState} from '../reducer';
import {hentFeatures} from '../middleware/api';
import {
    BRUK_TILTAKSAKTIVITET_FRA_AKTIVITETSPLAN,
    DARKMODE,
    LA_VEILEDER_VISE_FLERE_ENN_TRE_KOLONNER_SAMTIDIG,
    PORTEFOLJE_FEATURES
} from '../konstanter';

const ADD_FEATURE = 'veilarbportefoljeflatefs/features/ADD_FEATURE';

export interface FeaturesState {
    [feature: string]: boolean;
}

const initalState: FeaturesState = {
    [DARKMODE]: false,
    [LA_VEILEDER_VISE_FLERE_ENN_TRE_KOLONNER_SAMTIDIG]: false,
    [BRUK_TILTAKSAKTIVITET_FRA_AKTIVITETSPLAN]: false
};

// Reducer
export function featuresReducer(state: FeaturesState = initalState, action): FeaturesState {
    switch (action.type) {
        case ADD_FEATURE: {
            const next = {...state, ...action.features};
            const changed = Object.keys(next).some(k => next[k] !== state[k]);
            return changed ? next : state;
        }
        default:
            return state;
    }
}

// Action Creators
export function hentFeaturesFraUnleash() {
    const featureQueryString = PORTEFOLJE_FEATURES.map(feature => `feature=${feature}`).join('&');
    return dispatch => {
        hentFeatures(featureQueryString).then(json =>
            dispatch({
                type: ADD_FEATURE,
                features: json
            })
        );
    };
}

export function sjekkFeature(state: AppState, feature: string): boolean {
    return state.features[feature];
}
