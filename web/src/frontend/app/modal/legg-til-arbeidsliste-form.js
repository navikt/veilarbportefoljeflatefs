import React, { PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { FieldArray } from 'redux-form';
import { validForm, rules } from 'react-redux-form-validation';
import { FormattedMessage } from 'react-intl';
import Datovelger from '../components/datovelger/datovelger';
import Textarea from '../components/textarea/textarea';
import { lagreArbeidsliste } from '../ducks/arbeidsliste';
import { oppdaterArbeidslisteForBruker } from '../ducks/portefolje';

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

// eslint-disable-next-line react/prop-types
function renderFelter({ fields }) {
    return (
        <div>
            {fields.map((name, idx) => (
                <div key={`${name}`}>
                    <div className="nav-input blokk-s">
                        <Textarea
                            labelId={`${name}.kommentar`}
                            label={label(fields.get(idx))}
                            feltNavn={`${name}.kommentar`}
                            placeholder=""
                            maxLength={KOMMENTAR_MAKS_LENGDE}
                            disabled={false}
                            visTellerFra={0}
                        />
                    </div>
                    <Datovelger
                        feltNavn={`${name}.frist`}
                        labelId="arbeidsliste-form.label.dato"
                        tidligsteFom={new Date()}
                    />
                </div>
                ))}
        </div>);
}

function LeggTilArbeidslisteForm({ lukkModal, handleSubmit }) {
    return (
        <form onSubmit={handleSubmit}>
            <FieldArray name="arbeidsliste" component={renderFelter} />
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

LeggTilArbeidslisteForm.propTypes = {
    lukkModal: PT.func.isRequired,
    handleSubmit: PT.func.isRequired
};

export const formNavn = 'arbeidsliste_kommentar_skjema';
const LeggTilArbeidslisteReduxForm = validForm({
    form: formNavn,
    validate: {
        kommentar: [begrensetKommentarLengde, pakrevdTekst],
        frist: []
    }
})(LeggTilArbeidslisteForm);

const mapStateToProps = (state, props) => {
    const arbeidslisteData = props.valgteBrukere.map(({ fornavn, etternavn, fnr }) => ({
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

const mapDispatchToProps = () => ({
    onSubmit: (formData, dispatch, props) => {
        const arbeidsliste = formData.arbeidsliste.map((bruker, index) => ({
            fnr: bruker.fnr,
            kommentar: formData.arbeidsliste[index].kommentar,
            frist: formData.arbeidsliste[index].frist,
            arbeidslisteAktiv: true
        }));
        lagreArbeidsliste(arbeidsliste)(dispatch).then(() => oppdaterArbeidslisteForBruker(arbeidsliste)(dispatch));
        props.lukkModal();
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(LeggTilArbeidslisteReduxForm);

