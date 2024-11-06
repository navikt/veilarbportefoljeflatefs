import {AppState} from '../reducer';
import {hentFeatures, hentVedtakstotteFeature} from '../middleware/api';
import {
    ALERTSTRIPE_FEILMELDING,
    DARKMODE,
    FILTER_FOR_PERSONER_MED_BARN_UNDER_18,
    HUSKELAPP,
    PORTEFOLJE_FEATURES,
    SPOR_OM_TILBAKEMELDING,
    VEDTAKSTOTTE,
    VIS_AAP_VURDERINGSFRISTKOLONNER,
    VIS_FILTER_14A_FRA_VEDTAKSSTOTTE,
    VIS_STATUSFILTER_TILTAKSHENDELSE
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
    [VIS_AAP_VURDERINGSFRISTKOLONNER]: false,
    [FILTER_FOR_PERSONER_MED_BARN_UNDER_18]: false,
    [HUSKELAPP]: false,
    [VIS_STATUSFILTER_TILTAKSHENDELSE]: false,
    [VIS_FILTER_14A_FRA_VEDTAKSSTOTTE]: false
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
