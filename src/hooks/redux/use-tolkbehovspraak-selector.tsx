import {useSelector} from 'react-redux';
import {AppState} from '../../reducer';

const selectTolkbehovSpraakData = (state: AppState) => state.tolkbehovSpraakList.data;

export function useTolkbehovSelector() {
    return useSelector<AppState, Map<string, string>>(state => selectTolkbehovSpraakData(state));
}
