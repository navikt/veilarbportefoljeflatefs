import {useSelector} from 'react-redux';
import {AppState} from '../../reducer';
import {StatustallVeileder} from '../../ducks/statustall-veileder';
import {StatustallEnhet} from '../../ducks/statustall-enhet';

const selectStatustallVeilederData = (state: AppState) => state.statustallVeileder.data;
const selectStatustallEnhetData = (state: AppState) => state.statustallEnhet.data;

export function useStatustallVeilederSelector() {
    return useSelector<AppState, StatustallVeileder>(state => selectStatustallVeilederData(state));
}

export function useStatustallEnhetSelector() {
    return useSelector<AppState, StatustallEnhet>(state => selectStatustallEnhetData(state));
}
