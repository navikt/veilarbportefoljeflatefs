import {AppState} from '../reducer';
import {hentFeatures} from '../middleware/api';
import {
    ALERTSTRIPE_FEILMELDING,
    DARKMODE,
    LA_VEILEDER_VISE_FLERE_ENN_TRE_KOLONNER_SAMTIDIG,
    PORTEFOLJE_FEATURES,
    VIS_AAPFILTER_MED_KELVINDATA,
    VIS_TILTAKSPENGER_MED_TPSAKDATA,
    SKJUL_FILTER_SAMMENLIGNE_GJELDENDE_14A_OG_ARENA
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
    [LA_VEILEDER_VISE_FLERE_ENN_TRE_KOLONNER_SAMTIDIG]: false,
    [SKJUL_FILTER_SAMMENLIGNE_GJELDENDE_14A_OG_ARENA]: false
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
