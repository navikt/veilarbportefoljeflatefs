import { useSelector } from 'react-redux';
import { AppState } from '../../reducer';
import { ToastActionType } from '../../store/toast/actions';
import { OrNothing } from '../../utils/types/types';
const selectEnhetId = (state: AppState) => state.toastReducer.toasts;

export function useToastSelector(): OrNothing<ToastActionType> | null  {
    return useSelector(selectEnhetId);
}
