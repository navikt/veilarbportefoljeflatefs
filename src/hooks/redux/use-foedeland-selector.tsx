import {useSelector} from 'react-redux';
import {AppState} from '../../reducer';

const selectFoedelandData = (state: AppState) => state.foedelandList.data;

export function useFoedelandSelector() {
    return useSelector<AppState, Map<string, string>>(state => selectFoedelandData(state));
}
