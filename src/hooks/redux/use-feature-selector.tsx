import {useSelector} from 'react-redux';
import {createSelector} from 'reselect';
import {AppState} from '../../reducer';
import {FeaturesState} from '../../ducks/features';

const selectFeatures = (state: AppState): FeaturesState => state.features;
const selectHarFeature = createSelector([selectFeatures], features => (feature: string) => !!features[feature]);

export function useFeatureSelector() {
    const harFeature: (feature: string) => boolean = useSelector(selectHarFeature);
    return harFeature;
}
