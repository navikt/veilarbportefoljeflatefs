import React, { PropTypes as PT } from 'react';
import { Knapp } from 'nav-frontend-knapper';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Element } from 'nav-frontend-typografi';
import { reduxForm } from 'redux-form';
import { slettArbeidsliste } from '../ducks/arbeidsliste';
import { oppdaterArbeidslisteForBruker } from '../ducks/portefolje';
import { brukerShape } from '../proptype-shapes';
import { leggTilStatustall } from '../ducks/statustall';
import { STATUS } from '../ducks/utils';
import { FJERN_FRA_ARBEIDSLISTE_FEILET, visFeiletModal } from '../ducks/modal-feilmelding-brukere';
import { visServerfeilModal } from '../ducks/modal-serverfeil';

function brukerLabel(bruker) {
    return (
        <li key={bruker.fnr}>
            <Element>
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


function FjernFraArbeidslisteForm({ lukkModal, valgteBrukere, handleSubmit, slettFraArbeidslisteStatus }) {
    const laster = slettFraArbeidslisteStatus !== undefined && slettFraArbeidslisteStatus !== STATUS.OK;
    return (
        <form onSubmit={handleSubmit}>
            <div className="arbeidsliste-listetekst">
                <ul>
                    {valgteBrukere.map((bruker) => brukerLabel(bruker))}
                </ul>
            </div>
            <div className="modal-footer">
                <Knapp type="hoved" className="knapp knapp--hoved" spinner={laster} onClick={handleSubmit}>
                    <FormattedMessage id="modal.knapp.lagre" />
                </Knapp>
                <button type="button" className="knapp" onClick={lukkModal}>
                    <FormattedMessage id="modal.knapp.avbryt" />
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
    handleSubmit: PT.func.isRequired,
    slettFraArbeidslisteStatus: PT.any
};

function oppdaterState(res, props, arbeidsliste, dispatch) {
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
        const arbeidsliste = props.valgteBrukere.map((bruker) => ({
            fnr: bruker.fnr,
            kommentar: bruker.arbeidsliste.kommentar,
            frist: bruker.arbeidsliste.frist
        }));
        slettArbeidsliste(arbeidsliste)(dispatch)
            .then((res) => oppdaterState(res, props, arbeidsliste, dispatch));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(FjernFraArbeidslisteReduxForm);

