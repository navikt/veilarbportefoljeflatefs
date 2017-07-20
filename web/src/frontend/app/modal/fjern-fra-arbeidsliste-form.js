import React, { PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Element } from 'nav-frontend-typografi';
import { slettArbeidsliste } from '../ducks/arbeidsliste';
import { oppdaterArbeidslisteForBruker } from '../ducks/portefolje';
import { brukerShape } from '../proptype-shapes';

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

function FjernFraArbeidslisteForm({ lukkModal, valgteBrukere, fjernFraArbeidsliste }) {
    return (
        <form>
            <ul>
                { valgteBrukere.map((bruker) => brukerLabel(bruker)) }
            </ul>
            <div>
                <button
                    type="submit"
                    className="knapp knapp--hoved"
                    onClick={() => fjernFraArbeidsliste(valgteBrukere)}
                >
                    <FormattedMessage id="modal.knapp.bekreft" />
                </button>
                <button type="button" className="knapp" onClick={lukkModal}>
                    <FormattedMessage id="modal.knapp.avbryt" />
                </button>
            </div>
        </form>
    );
}

FjernFraArbeidslisteForm.propTypes = {
    lukkModal: PT.func.isRequired,
    valgteBrukere: PT.arrayOf(brukerShape).isRequired,
    fjernFraArbeidsliste: PT.func.isRequired
};

const mapDispatchToProps = (dispatch, props) => ({
    fjernFraArbeidsliste: (valgteBrukere) => {
        const arbeidsliste = valgteBrukere.map((bruker) => ({
            fnr: bruker.fnr,
            kommentar: null,
            frist: null,
            arbeidslisteAktiv: false
        }));
        slettArbeidsliste(arbeidsliste)(dispatch).then(() => oppdaterArbeidslisteForBruker(arbeidsliste)(dispatch));
        props.lukkModal();
    }
});

export default connect(null, mapDispatchToProps)(FjernFraArbeidslisteForm);

