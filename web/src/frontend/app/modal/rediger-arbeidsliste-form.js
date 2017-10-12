import React, { PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { Knapp } from 'nav-frontend-knapper';
import { validForm, rules } from 'react-redux-form-validation';
import { FormattedMessage } from 'react-intl';
import { Undertittel } from 'nav-frontend-typografi';
import Datovelger from '../components/datovelger/datovelger';
import Textarea from '../components/textarea/textarea';
import { oppdaterArbeidslisteForBruker } from '../ducks/portefolje';
import { brukerShape, statusShape } from '../proptype-shapes';
import { redigerArbeidsliste } from '../ducks/arbeidsliste';
import { visServerfeilModal } from '../ducks/modal-serverfeil';
import { STATUS } from '../ducks/utils';

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
    return (<Undertittel><FormattedMessage
        id="modal.legg.til.arbeidsliste.brukerinfo"
        values={{
            etternavn: bruker.etternavn,
            fornavn: bruker.fornavn,
            fnr: bruker.fnr
        }}
    /></Undertittel>);
}



function RedigerArbeidslisteForm({ lukkModal,
                                     handleSubmit,
                                     bruker,
                                     sistEndretDato,
                                     sistEndretAv,
                                     arbeidslisteStatus }) {
    const lagrer = arbeidslisteStatus !== undefined && arbeidslisteStatus !== STATUS.OK;
    return (
        <form onSubmit={handleSubmit}>
            <div className="input-fields">
                <div className="nav-input blokk-s">
                    <Textarea
                        labelId={'kommentar'}
                        label={label(bruker)}
                        feltNavn={'kommentar'}
                        placeholder=""
                        maxLength={KOMMENTAR_MAKS_LENGDE}
                        disabled={false}
                        visTellerFra={0}
                    />
                </div>
                <p className="arbeidsliste--modal-redigering">
                    <FormattedMessage
                        id="arbeidsliste.kommentar.footer"
                        values={{
                            dato: sistEndretDato,
                            veileder: sistEndretAv
                        }}
                    />
                </p>
                <Datovelger
                    feltNavn={'frist'}
                    labelId="arbeidsliste-form.label.dato"
                    feltErValgfritt
                />
            </div>
            <div className="modal-footer" >
                <Knapp type="hoved" className="knapp knapp--hoved" onClick={handleSubmit} spinner={lagrer}>
                    <FormattedMessage id="modal.knapp.lagre" />
                </Knapp>
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
    bruker: brukerShape.isRequired,
    sistEndretDato: PT.string.isRequired,
    sistEndretAv: PT.string.isRequired,
    arbeidslisteStatus: statusShape
};

const RedigerArbeidslisteFormValidation = validForm({
    form: 'arbeidsliste-rediger',
    validate: {
        kommentar: [begrensetKommentarLengde, pakrevdTekst],
        frist: []
    }
})(RedigerArbeidslisteForm);


function oppdaterState(res, arbeidsliste, innloggetVeileder, fnr, lukkModal, dispatch) {

    if (!res) {
        return visServerfeilModal()(dispatch);
    }
    lukkModal();
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
            frist: formData.frist
        };
        redigerArbeidsliste(arbeidsliste, props.bruker.fnr)(dispatch)
            .then((res) => oppdaterState(res, arbeidsliste, props.innloggetVeileder, props.bruker.fnr, props.lukkModal,
                dispatch));
    }

});

const mapStateToProps = (state, props) => ({
    initialValues: {
        kommentar: props.bruker.arbeidsliste.kommentar,
        frist: props.bruker.arbeidsliste.frist
    },
    arbeidslisteStatus: state.arbeidsliste.status
});

export default connect(mapStateToProps, mapDispatchToProps)(RedigerArbeidslisteFormValidation);

