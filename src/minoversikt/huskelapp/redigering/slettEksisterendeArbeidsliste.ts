import {BrukerModell} from '../../../model-interfaces';
import {visServerfeilModal} from '../../../ducks/modal-serverfeil';
import {leggTilStatustall} from '../../../ducks/statustall-veileder';
import {oppdaterArbeidslisteForBruker} from '../../../ducks/portefolje';
import {ThunkDispatch} from 'redux-thunk';
import {AppState} from '../../../reducer';
import {AnyAction} from 'redux';
import {slettArbeidslisteUtenFargekategori} from '../../../middleware/api';

export const slettArbeidslisteUtenFargekategoriOgOppdaterRedux = async (
    bruker: BrukerModell,
    dispatch: ThunkDispatch<AppState, any, AnyAction>
) => {
    try {
        const arbeidslisteUtenFargekategori = await slettArbeidslisteUtenFargekategori(bruker.fnr);
        const ikkeAktivArbeidsliste = {...arbeidslisteUtenFargekategori, arbeidslisteAktiv: false, fnr: bruker.fnr};
        leggTilStatustall('minArbeidsliste', -1)(dispatch);
        oppdaterArbeidslisteForBruker([ikkeAktivArbeidsliste])(dispatch);
    } catch (error) {
        return visServerfeilModal()(dispatch);
    }
};
