import React, {PropTypes as PT} from 'react';
import {connect} from 'react-redux';
import {FieldArray} from 'redux-form';
import {rules, validForm} from 'react-redux-form-validation';
import {FormattedMessage} from 'react-intl';
import {Undertittel} from 'nav-frontend-typografi';
import {lagreArbeidsliste} from '../ducks/arbeidsliste';
import {oppdaterArbeidslisteForBruker} from '../ducks/portefolje';
import {leggTilStatustall} from '../ducks/statustall';
import {LEGG_TIL_ARBEIDSLISTE_FEILET, visFeiletModal} from '../ducks/modal-feilmelding-brukere';
import {visServerfeilModal} from '../ducks/modal-serverfeil';
import Textarea from './../components/textarea/textarea';
import Datovelger from './../components/datovelger/datovelger';
import {arbeidsliste} from "../proptype-shapes";

const KOMMENTAR_MAKS_LENGDE = 250;
let NAME = '';

const begrensetKommentarLengde = rules.maxLength(
    KOMMENTAR_MAKS_LENGDE,
    <FormattedMessage
        id="legg-til-arbeidsliste-form.feilmelding.kommentar-lengde"
        values={ {KOMMENTAR_MAKS_LENGDE, NAME } }
    />
);
const pakrevdTekst = rules.minLength(
    0,
    <FormattedMessage id="legg-til.arbeidsliste-form.feilmelding.tekst.mangler"/>
);


function label(bruker) {
    return (<Undertittel><FormattedMessage
        id="modal.legg.til.arbeidsliste.brukerinfo"
        values={{
            etternavn: bruker.etternavn,
            fornavn: bruker.fornavn,
            fnr: bruker.fnr
        }}
    /></Undertittel>);
}

// eslint-disable-next-line react/prop-types
function renderFelter({ fields }) {
    return (
        <div>
            {fields.map((name, idx) => (
                    <fieldset className="input-fields" key={`${name}`}>
                        <div className="nav-input blokk-s">
                            <legend>
                                {label(fields.get(idx))}
                            </legend>
                            <Textarea
                                labelId={`${name}.kommentar`}
                                label="Kommentar"
                                feltNavn={`${name}.kommentar`}
                                placeholder=""
                                maxLength={KOMMENTAR_MAKS_LENGDE}
                            />
                        </div>
                        <Datovelger
                            feltNavn={`${name}.frist`}
                            labelId="arbeidsliste-form.label.dato"
                            label="Frist"
                            tidligsteFom={new Date()}
                        />
                    </fieldset>
                )
            )}
        </div>);
}


function LeggTilArbeidslisteForm({ lukkModal, handleSubmit, errorSummary }) {
    return (
        <form onSubmit={handleSubmit}>
            {errorSummary}
            <FieldArray name="arbeidsliste" component={renderFelter} test={'test'}/>
            <div>
                <div className="modal-footer">
                    <button type="submit" className="knapp knapp--hoved">
                        <FormattedMessage id="modal.knapp.lagre"/>
                    </button>
                    <button type="button" className="knapp" onClick={lukkModal}>
                        <FormattedMessage id="modal.knapp.avbryt"/>
                    </button>
                </div>
            </div>
        </form>
    );
}

LeggTilArbeidslisteForm.propTypes = {
    lukkModal: PT.func.isRequired,
    handleSubmit: PT.func.isRequired,
    errorSummary: PT.node.isRequired,
};

export const formNavn = 'arbeidsliste_kommentar_skjema';

const LeggTilArbeidslisteReduxForm = validForm({
    form: formNavn,
    errorSummaryTitle: (
        <FormattedMessage id="arbeidsliste.form.feiloppsummering.tittel"/>
    ),
    validate: {
        arbeidsliste: rules.array('arbeidsliste', {
            kommentar: [begrensetKommentarLengde, pakrevdTekst]
        })
    }


})(LeggTilArbeidslisteForm);

const mapStateToProps = (state, props) => {
    const arbeidslisteData = props.valgteBrukere.map(({fornavn, etternavn, fnr}) => ({
        fornavn,
        etternavn,
        fnr
    }) || [{
        fornavn: '',
        etternavn: '',
        fnr: ''
    }]);

    return {
        initialValues: {

        arbeidsliste: [...arbeidslisteData]
        }
    };
};

function oppdaterState(res, arbeidsliste, innloggetVeileder, dispatch) {
    if (!res) {
        return visServerfeilModal()(dispatch);
    }

    const brukereOK = res.data.data;
    const brukereError = res.data.error;

    const arbeidslisteToDispatch = arbeidsliste
        .map((a) => ({
            ...a,
            sistEndretAv: {veilederId: innloggetVeileder},
            endringstidspunkt: new Date().toISOString(),
            arbeidslisteAktiv: true
        }))
        .filter((bruker) => brukereOK.includes(bruker.fnr));

    if (brukereError.length > 0) {
        visFeiletModal({
            aarsak: LEGG_TIL_ARBEIDSLISTE_FEILET,
            brukereError
        })(dispatch);
    }

    leggTilStatustall('minArbeidsliste', brukereOK.length)(dispatch);
    return oppdaterArbeidslisteForBruker(arbeidslisteToDispatch, innloggetVeileder)(dispatch);
}

const mapDispatchToProps = () => ({
    onSubmit: (formData, dispatch, props) => {
        const arbeidsliste = formData.arbeidsliste.map((bruker, index) => ({
            fnr: bruker.fnr,
            kommentar: formData.arbeidsliste[index].kommentar,
            frist: formData.arbeidsliste[index].frist
        }));
        lagreArbeidsliste(arbeidsliste)(dispatch)
            .then((res) => oppdaterState(res, arbeidsliste, props.innloggetVeileder, dispatch));
        props.lukkModal();
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(LeggTilArbeidslisteReduxForm);

