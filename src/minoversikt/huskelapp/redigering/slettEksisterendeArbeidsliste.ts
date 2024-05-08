import {ArbeidslisteDataModell} from '../../../model-interfaces';
import {visServerfeilModal} from '../../../ducks/modal-serverfeil';
import {FJERN_FRA_ARBEIDSLISTE_FEILET, visFeiletModal} from '../../../ducks/modal-feilmelding-brukere';
import {leggTilStatustall} from '../../../ducks/statustall-veileder';
import {oppdaterArbeidslisteForBruker} from '../../../ducks/portefolje';

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
