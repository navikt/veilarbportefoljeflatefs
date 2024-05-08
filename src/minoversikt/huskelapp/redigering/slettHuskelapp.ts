import {slettHuskelappAction} from '../../../ducks/huskelapp';
import {leggTilStatustall} from '../../../ducks/statustall-veileder';
import {hentHuskelappForBruker} from '../../../ducks/portefolje';
import {ThunkDispatch} from 'redux-thunk';
import {AppState} from '../../../reducer';
import {AnyAction} from 'redux';
import {HuskelappModell} from '../../../model-interfaces';

export const handleSlettHuskelapp = async (
    dispatch: ThunkDispatch<AppState, any, AnyAction>,
    huskelapp: HuskelappModell,
    fnr: string,
    enhetId: string
) => {
    await dispatch(slettHuskelappAction(huskelapp.huskelappId!!));
    await dispatch(leggTilStatustall('mineHuskelapper', -1));
    await dispatch(hentHuskelappForBruker(fnr, enhetId));
};
