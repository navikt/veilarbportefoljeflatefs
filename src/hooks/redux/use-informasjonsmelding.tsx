import {useSelector} from 'react-redux';
import {AppState} from '../../reducer';
import {SesjonStatus} from '../../model-interfaces';
import {Maybe} from '../../utils/types';

const selectSesjonStatus = (state: AppState) => state.sesjonStatus.data;

export function useSesjonStatus() {
    return useSelector<AppState, Maybe<SesjonStatus>>(state => selectSesjonStatus(state));
}
