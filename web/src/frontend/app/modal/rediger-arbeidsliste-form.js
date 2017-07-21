import React, { PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { validForm, rules } from 'react-redux-form-validation';
import { FormattedMessage } from 'react-intl';
import Datovelger from '../components/datovelger/datovelger';
import Textarea from '../components/textarea/textarea';
import { oppdaterArbeidslisteForBruker } from '../ducks/portefolje';
import { brukerShape } from '../proptype-shapes';

const KOMMENTAR_MAKS_LENGDE = 50;

const begrensetKommentarLengde = rules.maxLength(
    KOMMENTAR_MAKS_LENGDE,
    <FormattedMessage
        id="legg-til-arbeidsliste-form.feilmelding.kommentar-lengde"
        values={{ KOMMENTAR_MAKS_LENGDE }}
    />
);
const pakrevdTekst = rules.minLength(
    0,
    <FormattedMessage id="legg-til.arbeidsliste-form.feilmelding.tekst.mangler" />
);

function label(bruker) {
    return (<FormattedMessage
        id="modal.legg.til.arbeidsliste.brukerinfo"
        values={{
            etternavn: bruker.etternavn,
            fornavn: bruker.fornavn,
            fnr: bruker.fnr
        }}
    />);
}

const textArea = (props) => (
    <div className="nav-input blokk-s">
        <Textarea
            labelId={`${name}.kommentar`}
            label={label(props.bruker)}
            feltNavn={'kommentar'}
            placeholder=""
            maxLength={KOMMENTAR_MAKS_LENGDE}
            disabled={false}
            visTellerFra={0}
        />
    </div>
    );

// eslint-disable-next-line react/prop-types
function datoVelger() {
    return (
        <div>
            <div key={`${name}`}>
                <Datovelger
                    feltNavn={`${name}.frist`}
                    labelId="arbeidsliste-form.label.dato"
                    tidligsteFom={new Date()}
                />
            </div>
        </div>);
}

function RedigerArbeidslisteForm({ lukkModal, handleSubmit, bruker }) {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field name="kommentar" bruker={bruker} component={textArea} />
                <Field name="frist" component={datoVelger} />
            </div>
            <div>
                <button type="submit" className="knapp knapp--hoved" onClick={handleSubmit}>
                    <FormattedMessage id="modal.knapp.lagre" />
                </button>
                <button type="button" className="knapp" onClick={lukkModal}>
                    <FormattedMessage id="modal.knapp.avbryt" />
                </button>
            </div>
        </form>
    );
}

RedigerArbeidslisteForm.propTypes = {
    lukkModal: PT.func.isRequired,
    handleSubmit: PT.func.isRequired,
    bruker: brukerShape.isRequired
};

const RedigerArbeidslisteFormValidation = validForm({
    form: 'arbeidsliste-rediger',
    validate: {
        kommentar: [begrensetKommentarLengde, pakrevdTekst],
        frist: []
    }
})(RedigerArbeidslisteForm);

const mapDispatchToProps = () => ({
    onSubmit: (formData, dispatch, props) => {
        const arbeidsliste = {};
        redigerArbeidsliste(arbeidsliste)(dispatch).then(() => oppdaterArbeidslisteForBruker(arbeidsliste)(dispatch));
        props.lukkModal();
    }

});

const mapStateToProps = (state, props) => ({
    initialValues: {
        kommentar: props.bruker.arbeidsliste.kommentar
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(RedigerArbeidslisteFormValidation);

