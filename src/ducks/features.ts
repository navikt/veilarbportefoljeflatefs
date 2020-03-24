import { AppState } from '../reducer';
import { hentFeatures } from '../middleware/api';
import {
    PORTEFOLJE_FEATURES,
    SPOR_OM_TILBAKEMELDING,
    VEDTAKSTOTTE,
    REGISTRERINGSFILTER,
} from '../konstanter';

const ADD_FEATURE = 'veilarbportefoljeflatefs/features/ADD_FEATURE';

export interface FeaturesState {
    [feature: string]: boolean;
}

const initalState: FeaturesState = {
    [SPOR_OM_TILBAKEMELDING]: false,
    [VEDTAKSTOTTE]: false,
    [REGISTRERINGSFILTER]: false,
};

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
export function hentFeaturesFraUnleash() {
    const featureQueryString = PORTEFOLJE_FEATURES
        .map((feature) => `feature=${feature}`)
        .join('&');
    return (dispatch) => {
        hentFeatures(featureQueryString)
            .then((json) => dispatch({
                type: ADD_FEATURE,
                features: json
            }));
    };
}

export function sjekkFeature(state: AppState, feature: string): boolean {
    return state.features[feature];
}
