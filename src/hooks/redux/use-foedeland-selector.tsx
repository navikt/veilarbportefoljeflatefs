import {AppState} from '../../reducer';
import {useSelector} from 'react-redux';

const selectFoedelandData = (state: AppState) => state.foedelandList.data;

export function useFoedelandSelector() {
    return useSelector<AppState, Map<string, string>>(state => selectFoedelandData(state));
}
