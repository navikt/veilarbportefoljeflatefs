import {useSelector} from 'react-redux';
import {AppState} from '../../reducer';
import {OrNothing} from '../../utils/types/types';
import {InnloggetVeilederModell} from '../../typer/enhet-og-veiledere-modeller';

const selectIdent = (state: AppState) => state.innloggetVeileder.data;

export function useIdentSelector(): OrNothing<InnloggetVeilederModell> {
    return useSelector(selectIdent);
}
