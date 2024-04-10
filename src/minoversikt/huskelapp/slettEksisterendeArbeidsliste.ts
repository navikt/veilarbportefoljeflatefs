import {ArbeidslisteDataModell, BrukerModell} from '../../model-interfaces';
import {visServerfeilModal} from '../../ducks/modal-serverfeil';
import {FJERN_FRA_ARBEIDSLISTE_FEILET, visFeiletModal} from '../../ducks/modal-feilmelding-brukere';
import {leggTilStatustall} from '../../ducks/statustall-veileder';
import {oppdaterArbeidslisteForBruker} from '../../ducks/portefolje';
import {slettArbeidslisteUtenFargekategori} from '../../middleware/api';
import {ThunkDispatch} from 'redux-thunk';
import {AppState} from '../../reducer';
import {AnyAction} from 'redux';

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

export const oppdaterStateVedSlettArbeidsliste = (res, arbeidsliste: ArbeidslisteDataModell[], dispatch) => {
    if (!res) {
        return visServerfeilModal()(dispatch);
    }
    const brukereOK = res.data.data;
    const brukereError = res.data.error;

    const arbeidslisteToDispatch = arbeidsliste
        .map(a => ({
            ...a,
            arbeidslisteAktiv: false
        }))
        .filter(bruker => brukereOK.includes(bruker.fnr));

    if (brukereError.length > 0) {
        visFeiletModal({
            aarsak: FJERN_FRA_ARBEIDSLISTE_FEILET,
            brukereError
        })(dispatch);
    }

    leggTilStatustall('minArbeidsliste', -brukereOK.length)(dispatch);

    return oppdaterArbeidslisteForBruker(arbeidslisteToDispatch)(dispatch);
};
