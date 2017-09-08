import React, {PropTypes as PT} from 'react';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {Element, Normaltekst} from 'nav-frontend-typografi';
import {reduxForm} from 'redux-form';
import {slettArbeidsliste} from '../ducks/arbeidsliste';
import {oppdaterArbeidslisteForBruker} from '../ducks/portefolje';
import {brukerShape} from '../proptype-shapes';
import {leggTilStatustall} from '../ducks/statustall';
import {FJERN_FRA_ARBEIDSLISTE_FEILET, visFeiletModal} from '../ducks/modal-feilmelding-brukere';
import {visServerfeilModal} from '../ducks/modal-serverfeil';

function brukerLabel(bruker) {
    return (
        <li key={bruker.fnr}>
            <Element className="blokk-xs">
                <FormattedMessage
                    id="modal.legg.til.arbeidsliste.brukerinfo"
                    values={{
                        etternavn: bruker.etternavn,
                        fornavn: bruker.fornavn,
                        fnr: bruker.fnr
                    }}
                />
            </Element>
        </li>
    );
}


function FjernFraArbeidslisteForm({lukkModal, valgteBrukere, handleSubmit}) {
    return (
        <form onSubmit={handleSubmit}>
            <Normaltekst className="blokk-s arbeidsliste-normaltekst">
                <FormattedMessage
                    id="modal.fjern.fra.arbeidsliste.infotekst"
                    values={{antall: valgteBrukere.length}}
                />
            </Normaltekst>
            <div className="arbeidsliste-listetekst">
                <ul>
                    {valgteBrukere.map((bruker) => brukerLabel(bruker))}
                </ul>
            </div>
            <div className="modal-footer">
                <button type="submit" className="knapp knapp--hoved" onClick={handleSubmit}>
                    <FormattedMessage id="modal.knapp.lagre"/>
                </button>
                <button type="button" className="knapp" onClick={lukkModal}>
                    <FormattedMessage id="modal.knapp.avbryt"/>
                </button>
            </div>
        </form>
    );
}

const FjernFraArbeidslisteReduxForm = reduxForm({
    form: 'fjern-fra-arbeidsliste-form'
})(FjernFraArbeidslisteForm);

FjernFraArbeidslisteForm.propTypes = {
    lukkModal: PT.func.isRequired,
    valgteBrukere: PT.arrayOf(brukerShape).isRequired,
    handleSubmit: PT.func.isRequired
};

function oppdaterState(res, arbeidsliste, dispatch) {
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

const mapDispatchToProps = () => ({
    onSubmit: (formData, dispatch, props) => {
        const arbeidsliste = props.valgteBrukere.map((bruker) => ({
            fnr: bruker.fnr,
            kommentar: bruker.arbeidsliste.kommentar,
            frist: bruker.arbeidsliste.frist
        }));
        slettArbeidsliste(arbeidsliste)(dispatch)
            .then((res) => oppdaterState(res, arbeidsliste, dispatch));
        props.lukkModal();
    }
});

export default connect(null, mapDispatchToProps)(FjernFraArbeidslisteReduxForm);

