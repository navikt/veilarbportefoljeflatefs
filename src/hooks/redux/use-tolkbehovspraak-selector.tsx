import {AppState} from '../../reducer';
import {useSelector} from 'react-redux';

const selectTolkbehovSpraakData = (state: AppState) => state.tolkbehovSpraakList.data;

export function useTolkbehovSelector() {
    return useSelector<AppState, Map<string, string>>(state => selectTolkbehovSpraakData(state));
}
