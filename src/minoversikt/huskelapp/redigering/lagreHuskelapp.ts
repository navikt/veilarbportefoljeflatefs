import {HUSKELAPP_LAGRE_OK, lagreHuskelappAction} from '../../../ducks/huskelapp';
import {hentHuskelappForBruker} from '../../../ducks/portefolje';
import {leggTilStatustall} from '../../../ducks/statustall/statustall-veileder';
import {ThunkDispatch} from 'redux-thunk';
import {AppState} from '../../../reducer';
import {AnyAction} from 'redux';
import {BrukerModell} from '../../../model-interfaces';
import {FormikValues} from 'formik';

export const lagreHuskelapp = async (
    dispatch: ThunkDispatch<AppState, any, AnyAction>,
    values: FormikValues,
    bruker: BrukerModell,
    enhetId: string,
    onModalClose: () => void
) => {
    const {type: responseAction} = await dispatch(
        lagreHuskelappAction({
            brukerFnr: bruker.fnr,
            enhetId: enhetId,
            frist: values.frist?.toString(),
            kommentar: values.kommentar
        })
    );
    if (responseAction === HUSKELAPP_LAGRE_OK) {
        dispatch(hentHuskelappForBruker(bruker.fnr, enhetId));
        await dispatch(leggTilStatustall('mineHuskelapper', 1));
        onModalClose();
    }
};
