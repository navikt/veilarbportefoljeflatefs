import * as React from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import { connect } from 'react-redux';
import { Element } from 'nav-frontend-typografi';
import { reduxForm } from 'redux-form';
import { slettArbeidsliste } from '../ducks/arbeidsliste';
import { oppdaterArbeidslisteForBruker } from '../ducks/portefolje';
import { leggTilStatustall } from '../ducks/statustall';
import { STATUS } from '../ducks/utils';
import { FJERN_FRA_ARBEIDSLISTE_FEILET, visFeiletModal } from '../ducks/modal-feilmelding-brukere';
import { visServerfeilModal } from '../ducks/modal-serverfeil';
import { ArbeidslisteDataModell, BrukerModell } from '../model-interfaces';

function brukerLabel(bruker) {
    return (
        <li key={bruker.fnr}>
            <Element>
                {`${bruker.fornavn} ${bruker.etternavn}, ${bruker.fnr}`}
            </Element>
        </li>
    );
}

interface FjernFraArbeidslisteFormProps {
    lukkModal: () => void;
    valgteBrukere: BrukerModell[];
    handleSubmit: () => void;
    slettFraArbeidslisteStatus?: STATUS;
}

function FjernFraArbeidslisteForm({ lukkModal, valgteBrukere, handleSubmit, slettFraArbeidslisteStatus }: FjernFraArbeidslisteFormProps) {
    const laster = slettFraArbeidslisteStatus !== undefined && slettFraArbeidslisteStatus !== STATUS.OK;
    return (
        <form onSubmit={handleSubmit}>
            <div className="arbeidsliste-listetekst">
                <ul>
                    {valgteBrukere.map((bruker) => brukerLabel(bruker))}
                </ul>
            </div>
            <div className="modal-footer">
                <Hovedknapp className="knapp knapp--hoved" spinner={laster} onClick={handleSubmit}>
                    Lagre
                </Hovedknapp>
                <button type="button" className="knapp" onClick={lukkModal}>
                    Avbryt
                </button>
            </div>
        </form>
    );
}

export const FJERN_FRA_ARBEIDSLISTE_FORM_NAME = 'fjern-fra-arbeidsliste-form';
const FjernFraArbeidslisteReduxForm = reduxForm<{}, FjernFraArbeidslisteFormProps>({
    form: FJERN_FRA_ARBEIDSLISTE_FORM_NAME
})(FjernFraArbeidslisteForm);

function oppdaterState(res, props: FjernFraArbeidslisteFormProps, arbeidsliste: ArbeidslisteDataModell[], dispatch) {
    props.lukkModal();
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

const mapDispatchToProps = () => ({
    onSubmit: (formData, dispatch, props) => {
        const arbeidsliste: ArbeidslisteDataModell[] = props.valgteBrukere.map((bruker) => ({
            fnr: bruker.fnr,
            kommentar: bruker.arbeidsliste.kommentar,
            frist: bruker.arbeidsliste.frist
        }));
        slettArbeidsliste(arbeidsliste)(dispatch)
            .then((res) => oppdaterState(res, props, arbeidsliste, dispatch));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(FjernFraArbeidslisteReduxForm as any); // todo: fix typing
