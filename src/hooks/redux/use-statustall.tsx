import {useSelector} from 'react-redux';
import {AppState} from '../../reducer';
import {Statustall} from '../../ducks/statustall';

const selectStatustallVeilederData = (state: AppState) => state.statustallVeileder.data;
const selectStatustallEnhetData = (state: AppState) => state.statustallEnhet.data;

export function useStatustallVeilederSelector() {
    return useSelector<AppState, Statustall>(state => selectStatustallVeilederData(state));
}

export function useStatustallEnhetSelector() {
    return useSelector<AppState, Statustall>(state => selectStatustallEnhetData(state));
}
