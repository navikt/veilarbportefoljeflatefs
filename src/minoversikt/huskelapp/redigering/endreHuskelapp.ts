import {FormikValues} from 'formik';
import {endreHuskelappAction} from '../../../ducks/huskelapp';
import {hentHuskelappForBruker} from '../../../ducks/portefolje';
import {BrukerModell} from '../../../typer/bruker-modell';
import {AppDispatch} from '../../../store';

export const endreHuskelapp = async (
    dispatch: AppDispatch,
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
