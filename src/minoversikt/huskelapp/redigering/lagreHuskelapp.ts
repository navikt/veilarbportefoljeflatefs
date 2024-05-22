import {lagreHuskelappAction} from '../../../ducks/huskelapp';
import {hentHuskelappForBruker} from '../../../ducks/portefolje';
import {leggTilStatustall} from '../../../ducks/statustall-veileder';
import {ThunkDispatch} from 'redux-thunk';
import {AppState} from '../../../reducer';
import {AnyAction} from 'redux';
import {ArbeidslisteDataModell, BrukerModell} from '../../../model-interfaces';
import {FormikValues} from 'formik';
import {slettArbeidslisteUtenFargekategoriOgOppdaterRedux} from './slettEksisterendeArbeidsliste';

export const lagreHuskelapp = async (
    dispatch: ThunkDispatch<AppState, any, AnyAction>,
    values: FormikValues,
    bruker: BrukerModell,
    enhetId: string,
    onModalClose: () => void,
    arbeidsliste: ArbeidslisteDataModell | null
) => {
    await dispatch(
        lagreHuskelappAction({
            brukerFnr: bruker.fnr,
            enhetId: enhetId!!,
            frist: values.frist?.toString(),
            kommentar: values.kommentar
        })
    );
    dispatch(hentHuskelappForBruker(bruker.fnr, enhetId!!));
    await dispatch(leggTilStatustall('mineHuskelapper', 1));
    if (!!arbeidsliste) {
        await slettArbeidslisteUtenFargekategoriOgOppdaterRedux(bruker, dispatch);
    }
    onModalClose();
};
