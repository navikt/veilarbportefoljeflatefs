import {useSelector} from 'react-redux';
import {AppState} from '../../reducer';
import {sjekkFeature} from '../../ducks/features';

const selectHarFeature = (state: AppState) => (feature: string) => sjekkFeature(state, feature);

export function useFeatureSelector() {
    const harFeature: (feature: string) => boolean = useSelector(selectHarFeature);
    return harFeature;
}
