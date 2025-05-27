import {useSelector} from 'react-redux';
import {AppState} from '../../reducer';
import {OrNothing} from '../../utils/types/types';
import {VeilederModell} from '../../typer/enhet-og-veiledere-modeller';

const selectIdent = (state: AppState) => state.innloggetVeileder.data;

export function useIdentSelector(): OrNothing<VeilederModell> {
    return useSelector(selectIdent);
}
