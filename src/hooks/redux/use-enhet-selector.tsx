import {useSelector} from 'react-redux';
import {AppState} from '../../reducer';

const selectEnhetId = (state: AppState) => state.valgtEnhet.data.enhetId;

export function useEnhetSelector(): string | null {
    return useSelector(selectEnhetId);
}
