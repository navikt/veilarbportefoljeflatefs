import {useSelector} from 'react-redux';
import {AppState} from '../../reducer';

import {StatustallEnhet, StatustallVeileder} from '../../ducks/statustall/statustall-typer';

const selectStatustallVeilederData = (state: AppState) => state.statustallVeileder.data;
const selectStatustallEnhetData = (state: AppState) => state.statustallEnhet.data;

export function useStatustallVeilederSelector() {
    return useSelector<AppState, StatustallVeileder>(state => selectStatustallVeilederData(state));
}

export function useStatustallEnhetSelector() {
    return useSelector<AppState, StatustallEnhet>(state => selectStatustallEnhetData(state));
}
