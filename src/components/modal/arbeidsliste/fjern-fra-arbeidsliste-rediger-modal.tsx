import * as React from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import { connect } from 'react-redux';
import { slettArbeidsliste } from '../../../ducks/arbeidsliste';
import { oppdaterArbeidslisteForBruker } from '../../../ducks/portefolje';
import { leggTilStatustall } from '../../../ducks/statustall';
import { FJERN_FRA_ARBEIDSLISTE_FEILET, visFeiletModal } from '../../../ducks/modal-feilmelding-brukere';
import { visServerfeilModal } from '../../../ducks/modal-serverfeil';
import { ArbeidslisteDataModell, BrukerModell, Status } from '../../../model-interfaces';
import './arbeidsliste.less';
import { logEvent } from '../../../utils/frontend-logger';
import { ReactComponent as SlettIcon } from './slett.svg';
import { STATUS } from '../../../ducks/utils';

interface FjernFraArbeidslisteRedigerModalProps {
    lukkModal: () => void;
    valgtBruker: BrukerModell[];
    onSubmit: (valgtBruker: BrukerModell[], props) => void;
    slettFraArbeidslisteStatus?: Status;
}

function FjernFraArbeidslisteRedigerModal({lukkModal, valgtBruker, onSubmit, slettFraArbeidslisteStatus}: FjernFraArbeidslisteRedigerModalProps) {
    const laster = slettFraArbeidslisteStatus !== undefined && slettFraArbeidslisteStatus !== STATUS.OK;

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            logEvent('portefolje.metrikker.fjern_arbeidsliste');
            onSubmit(valgtBruker, lukkModal);
        }}>
            <div className="knapper">
                <Hovedknapp
                    htmlType="submit"
                    className="fjern--knapp"
                    spinner={laster}
                >
                    <SlettIcon/>
                    Fjern
                </Hovedknapp>
            </div>
            }
        </form>
    );
}

function oppdaterState(res, lukkModal: () => void, arbeidsliste: ArbeidslisteDataModell[], dispatch) {
    lukkModal();
    if (!res) {
        return visServerfeilModal()(dispatch);
    }
    const brukereOK = res.data.data;
    const brukereError = res.data.error;

    const arbeidslisteToDispatch = arbeidsliste
        .map((a) => ({
            ...a,
            arbeidslisteAktiv: false
        }))
        .filter((bruker) => brukereOK.includes(bruker.fnr));

    if (brukereError.length > 0) {
        visFeiletModal({
            aarsak: FJERN_FRA_ARBEIDSLISTE_FEILET,
            brukereError
        })(dispatch);
    }

    leggTilStatustall('minArbeidsliste', -brukereOK.length)(dispatch);

    return oppdaterArbeidslisteForBruker(arbeidslisteToDispatch)(dispatch);
}

const mapStateToProps = (state) => ({
    slettFraArbeidslisteStatus: state.arbeidsliste.status
});

const mapDispatchToProps = (dispatch) => ({
    onSubmit: (valgtBruker, lukkModal) => {
        const arbeidsliste: ArbeidslisteDataModell[] = valgtBruker.map((bruker) => ({
            fnr: bruker.fnr,
            kommentar: bruker.arbeidsliste.kommentar,
            frist: bruker.arbeidsliste.frist,
            kategori: bruker.arbeidsliste.kategori
        }));
        slettArbeidsliste(arbeidsliste)(dispatch)
            .then((res) => oppdaterState(res, lukkModal, arbeidsliste, dispatch));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(FjernFraArbeidslisteRedigerModal);
