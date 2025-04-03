import {useSelector} from 'react-redux';
import {AppState} from '../../reducer';

const selectGeografiskBostedData = (state: AppState) => state.geografiskBosted.data;

export function useGeografiskbostedSelector() {
    return useSelector<AppState, Map<string, string>>(state => selectGeografiskBostedData(state));
}
