import {useSelector} from 'react-redux';
import {AppState} from '../../reducer';

export function useVeilederListeSelector() {
    return useSelector((state: AppState) => state.veiledere.data.veilederListe);
}
