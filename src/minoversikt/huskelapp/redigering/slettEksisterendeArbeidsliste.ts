import {BrukerModell} from '../../../model-interfaces';
import {visServerfeilModal} from '../../../ducks/modal-serverfeil';
import {leggTilStatustall} from '../../../ducks/statustall-veileder';
import {oppdaterArbeidslisteForBruker} from '../../../ducks/portefolje';
import {ThunkDispatch} from 'redux-thunk';
import {AppState} from '../../../reducer';
import {AnyAction} from 'redux';
import {slettArbeidslisteMenIkkeFargekategori} from '../../../middleware/api';

export const slettArbeidslisteMenIkkeFargekategoriOgOppdaterRedux = async (
    bruker: BrukerModell,
    dispatch: ThunkDispatch<AppState, any, AnyAction>
) => {
    try {
        const slettetArbeidsliste = await slettArbeidslisteMenIkkeFargekategori(bruker.fnr);
        const ikkeAktivArbeidsliste = {...slettetArbeidsliste, arbeidslisteAktiv: false, fnr: bruker.fnr};
        leggTilStatustall('minArbeidsliste', -1)(dispatch);
        oppdaterArbeidslisteForBruker([ikkeAktivArbeidsliste])(dispatch);
    } catch (error) {
        return visServerfeilModal()(dispatch);
    }
};
