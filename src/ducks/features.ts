import {AppState} from '../reducer';
import {hentFeatures, hentVedtakstotteFeature} from '../middleware/api';
import {
    ALERTSTRIPE_FEILMELDING,
    DARKMODE,
    PORTEFOLJE_FEATURES,
    SPOR_OM_TILBAKEMELDING,
    VEDTAKSTOTTE,
    UTEN_KRR_FILTER,
    TVUNGEN_STEPPER,
    STILLING_FRA_NAV
} from '../konstanter';

const ADD_FEATURE = 'veilarbportefoljeflatefs/features/ADD_FEATURE';

export interface FeaturesState {
    [feature: string]: boolean;
}

const initalState: FeaturesState = {
    [SPOR_OM_TILBAKEMELDING]: false,
    [VEDTAKSTOTTE]: false,
    [DARKMODE]: false,
    [ALERTSTRIPE_FEILMELDING]: false,
    [UTEN_KRR_FILTER]: false,
    [TVUNGEN_STEPPER]: false,
    [STILLING_FRA_NAV]: false
};

// Reducer
export default function featuresReducer(state: FeaturesState = initalState, action): FeaturesState {
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

export function hentFeatureForVedtaksstotte(enhetId: string) {
    return dispatch => {
        hentVedtakstotteFeature(enhetId).then(json =>
            dispatch({
                type: ADD_FEATURE,
                features: {[VEDTAKSTOTTE]: json}
            })
        );
    };
}

export function sjekkFeature(state: AppState, feature: string): boolean {
    return state.features[feature];
}
