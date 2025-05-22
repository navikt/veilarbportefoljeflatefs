import {AnyAction} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {slettHuskelappAction} from '../../../ducks/huskelapp';
import {leggTilStatustall} from '../../../ducks/statustall/statustall-veileder';
import {hentHuskelappForBruker} from '../../../ducks/portefolje';
import {AppState} from '../../../reducer';
import {HuskelappModell} from '../../../typer/bruker-modell';

export const handleSlettHuskelapp = async (
    dispatch: ThunkDispatch<AppState, any, AnyAction>,
    huskelapp: HuskelappModell,
    fnr: string,
    enhetId: string
) => {
    await dispatch(slettHuskelappAction(huskelapp.huskelappId!));
    await dispatch(leggTilStatustall('mineHuskelapper', -1));
    await dispatch(hentHuskelappForBruker(fnr, enhetId));
};
