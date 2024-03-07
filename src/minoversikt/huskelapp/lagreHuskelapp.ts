import {lagreHuskelappAction} from '../../ducks/huskelapp';
import {hentHuskelappForBruker} from '../../ducks/portefolje';
import {leggTilStatustall} from '../../ducks/statustall-veileder';
import {ThunkDispatch} from 'redux-thunk';
import {AppState} from '../../reducer';
import {AnyAction} from 'redux';
import {ArbeidslisteDataModell, BrukerModell} from '../../model-interfaces';
import {FormikValues} from 'formik';
import {slettArbeidslisteAction} from '../../ducks/arbeidsliste';
import {oppdaterStateVedSlettArbeidsliste} from './slettEksisterendeArbeidsliste';

export const lagreHuskelapp = async (
    dispatch: ThunkDispatch<AppState, any, AnyAction>,
    values: FormikValues,
    bruker: BrukerModell,
    enhetId: string,
    onModalClose: () => void,
    arbeidsliste: ArbeidslisteDataModell[]
) => {
    await dispatch(
        lagreHuskelappAction({
            brukerFnr: bruker.fnr,
            enhetId: enhetId!!,
            frist: values.frist?.toString(),
            kommentar: values.kommentar
        })
    );
    await dispatch(hentHuskelappForBruker(bruker.fnr, enhetId!!));
    await dispatch(leggTilStatustall('mineHuskelapper', 1));
    if (!!arbeidsliste.length) {
        const res = await dispatch(slettArbeidslisteAction(arbeidsliste));
        await oppdaterStateVedSlettArbeidsliste(res, arbeidsliste, dispatch);
    }
    await onModalClose();
};
