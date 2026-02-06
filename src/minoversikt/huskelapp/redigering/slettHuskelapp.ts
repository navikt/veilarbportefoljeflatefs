import {slettHuskelappAction} from '../../../ducks/huskelapp';
import {leggTilStatustall} from '../../../ducks/statustall/statustall-veileder';
import {hentHuskelappForBruker} from '../../../ducks/portefolje';
import {HuskelappModell} from '../../../typer/bruker-modell';
import {AppDispatch} from '../../../store';

export const handleSlettHuskelapp = async (
    dispatch: AppDispatch,
    huskelapp: HuskelappModell,
    fnr: string,
    enhetId: string
) => {
    await dispatch(slettHuskelappAction(huskelapp.huskelappId!));
    await dispatch(leggTilStatustall('mineHuskelapper', -1));
    await dispatch(hentHuskelappForBruker(fnr, enhetId));
};
