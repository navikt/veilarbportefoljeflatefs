import {AnyAction} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {FormikValues} from 'formik';
import {endreHuskelappAction} from '../../../ducks/huskelapp';
import {hentHuskelappForBruker} from '../../../ducks/portefolje';
import {AppState} from '../../../reducer';
import {BrukerModell} from '../../../typer/bruker-modell';

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
    onModalClose();
};
