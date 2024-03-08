import {ThunkDispatch} from 'redux-thunk';
import {AppState} from '../reducer';
import {AnyAction} from 'redux';
import {FargekategoriDataModell} from '../model-interfaces';
import {lagreFargekategoriAction} from '../ducks/fargekategori';

export const oppdaterFargekategoriThunk = async (
    dispatch: ThunkDispatch<AppState, any, AnyAction>,
    values: FargekategoriDataModell
) => {
    await dispatch(lagreFargekategoriAction(values));
};
