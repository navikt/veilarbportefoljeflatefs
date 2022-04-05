import {useSelector} from 'react-redux';
import {AppState} from '../../reducer';
import {Systemmelding} from '../../model-interfaces';

const selectSystemmeldingerData = (state: AppState) => state.systemmeldinger.data;

export function useSystemmeldingerSelector() {
    const systemmeldinger: Systemmelding[] = useSelector<AppState, Systemmelding[]>(state =>
        selectSystemmeldingerData(state)
    );

    return systemmeldinger;
}
