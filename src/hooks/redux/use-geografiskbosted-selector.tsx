import {AppState} from '../../reducer';
import {useSelector} from 'react-redux';

const selectGeografiskBostedData = (state: AppState) => state.geografiskBosted.data;

export function useGeografiskbostedSelector() {
    return useSelector<AppState, Map<string, string>>(state => selectGeografiskBostedData(state));
}
