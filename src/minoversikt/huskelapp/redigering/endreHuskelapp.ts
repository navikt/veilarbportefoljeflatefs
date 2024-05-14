import {endreHuskelappAction} from '../../../ducks/huskelapp';
import {hentHuskelappForBruker} from '../../../ducks/portefolje';
import {ThunkDispatch} from 'redux-thunk';
import {AppState} from '../../../reducer';
import {AnyAction} from 'redux';
import {BrukerModell} from '../../../model-interfaces';
import {FormikValues} from 'formik';

export const endreHuskelapp = async (
    dispatch: ThunkDispatch<AppState, any, AnyAction>,
    values: FormikValues,
    bruker: BrukerModell,
    enhetId: string,
    onModalClose: () => void,
    huskelappId: string
) => {
    await dispatch(
        endreHuskelappAction({
            huskelappId: huskelappId,
            brukerFnr: bruker.fnr,
            enhetId: enhetId,
            frist: values.frist?.toString(),
            kommentar: values.kommentar
        })
    );
    await dispatch(hentHuskelappForBruker(bruker.fnr, enhetId));
    await onModalClose();
};
