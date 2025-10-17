import {AppState} from '../reducer';
import {hentFeatures} from '../middleware/api';
import {
    ALERTSTRIPE_FEILMELDING,
    BRUK_NYTT_ARENA_TILTAKSPENGER_FILTER,
    DARKMODE,
    PORTEFOLJE_FEATURES,
    VIS_AAPFILTER_MED_KELVINDATA,
    VIS_TILTAKSPENGER_MED_TPSAKDATA
} from '../konstanter';

const ADD_FEATURE = 'veilarbportefoljeflatefs/features/ADD_FEATURE';

export interface FeaturesState {
    [feature: string]: boolean;
}

const initalState: FeaturesState = {
    [DARKMODE]: false,
    [ALERTSTRIPE_FEILMELDING]: false,
    [VIS_AAPFILTER_MED_KELVINDATA]: false,
    [VIS_TILTAKSPENGER_MED_TPSAKDATA]: false,
    [BRUK_NYTT_ARENA_TILTAKSPENGER_FILTER]: false
};

// Reducer
export function featuresReducer(state: FeaturesState = initalState, action): FeaturesState {
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
