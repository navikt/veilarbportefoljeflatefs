import {useSelector} from 'react-redux';
import {AppState} from '../../reducer';
import {Systemmelding} from '../../ducks/systemmeldinger';

const selectSystemmeldingerData = (state: AppState) => state.systemmeldinger.data;

export function useSystemmeldingerSelector() {
    return useSelector<AppState, Systemmelding[]>(state => selectSystemmeldingerData(state));
}
