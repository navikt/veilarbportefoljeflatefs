import { useSelector } from 'react-redux';
import { AppState } from '../../reducer';

const selectEnhetId = (state: AppState) => state.veiledere.data.enhet.enhetId;

export function useEnhetIdSelector(): string {
    return useSelector(selectEnhetId);
}
