import { useSelector } from 'react-redux';
import { AppState } from '../../reducer';

const selectIdent = (state: AppState) => state.enheter.ident;

export function useIdentSelector(): undefined | string {
    return useSelector(selectIdent);
}
