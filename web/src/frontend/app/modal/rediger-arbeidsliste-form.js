import React, { PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { validForm, rules } from 'react-redux-form-validation';
import { FormattedMessage } from 'react-intl';
import Datovelger from '../components/datovelger/datovelger';
import Textarea from '../components/textarea/textarea';
import { oppdaterArbeidslisteForBruker } from '../ducks/portefolje';
import { brukerShape } from '../proptype-shapes';
import { redigerArbeidsliste } from '../ducks/arbeidsliste';
import { visServerfeilModal } from '../ducks/modal-serverfeil';

const KOMMENTAR_MAKS_LENGDE = 250;

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

function RedigerArbeidslisteForm({ lukkModal, handleSubmit, bruker }) {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Textarea
                    labelId={'kommentar'}
                    label={label(bruker)}
                    feltNavn={'kommentar'}
                    placeholder=""
                    maxLength={KOMMENTAR_MAKS_LENGDE}
                    disabled={false}
                    visTellerFra={0}
                />
                <Datovelger
                    feltNavn={'frist'}
                    labelId="arbeidsliste-form.label.dato"
                    feltErValgfritt
                />
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


function oppdaterState(res, arbeidsliste, innloggetVeileder, fnr, dispatch) {
    if (!res) {
        return visServerfeilModal()(dispatch);
    }

    const arbeidslisteToDispatch = Array.of({
        ...arbeidsliste,
        fnr,
        sistEndretAv: { veilederId: innloggetVeileder },
        endringstidspunkt: new Date().toISOString()
    });

    return oppdaterArbeidslisteForBruker(arbeidslisteToDispatch)(dispatch);
}
const mapDispatchToProps = () => ({
    onSubmit: (formData, dispatch, props) => {
        const arbeidsliste = {
            kommentar: formData.kommentar,
            frist: formData.frist,
            redigering: true
        };
        redigerArbeidsliste(arbeidsliste, props.bruker.fnr)(dispatch)
            .then((res) => oppdaterState(res, arbeidsliste, props.innloggetVeileder, props.bruker.fnr, dispatch));
        props.lukkModal();
    }

});

const mapStateToProps = (state, props) => ({
    initialValues: {
        kommentar: props.bruker.arbeidsliste.kommentar,
        frist: props.bruker.arbeidsliste.frist
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(RedigerArbeidslisteFormValidation);

