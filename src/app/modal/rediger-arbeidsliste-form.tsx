import * as React from 'react';
import { connect } from 'react-redux';
import { Knapp } from 'nav-frontend-knapper';
import { validForm, rules } from 'react-redux-form-validation';
import { FormattedMessage } from 'react-intl';
import { Undertittel } from 'nav-frontend-typografi';
import Datovelger from '../components/datovelger/datovelger';
import Textarea from '../components/textarea/textarea';
import { oppdaterArbeidslisteForBruker } from '../ducks/portefolje';
import { BrukerModell, Status } from '../model-interfaces';
import { redigerArbeidsliste } from '../ducks/arbeidsliste';
import { visServerfeilModal } from '../ducks/modal-serverfeil';
import { STATUS } from '../ducks/utils';
import { AppState } from '../reducer';
import { KOMMENTAR_MAKS_LENGDE, begrensetKommentarLengde, pakrevdTekst } from './legg-til-arbeidsliste-form';

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

interface RedigerArbeidslisteFormProps {
    lukkModal: () => void;
    handleSubmit: () => void;
    bruker: BrukerModell;
    sistEndretDato: Date;
    sistEndretAv: string;
    arbeidslisteStatus: Status;
}

function RedigerArbeidslisteForm({ lukkModal,
                                     handleSubmit,
                                     bruker,
                                     sistEndretDato,
                                     sistEndretAv,
                                     arbeidslisteStatus }: RedigerArbeidslisteFormProps) {
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
                        visTellerFra={500}
                    />
                </div>
                <p className="arbeidsliste--modal-redigering">
                    <FormattedMessage
                        id="arbeidsliste.kommentar.footer"
                        values={{
                            dato: sistEndretDato.toLocaleDateString(),
                            veileder: sistEndretAv
                        }}
                    />
                </p>
                <Datovelger
                    feltNavn={'frist'}
                    labelId="arbeidsliste-form.label.dato"
                    tidligsteFom={new Date()}
                    feltErValgfritt
                />
            </div>
            <div className="modal-footer" >
                <Knapp type="hoved" className="knapp knapp--hoved" onClick={ handleSubmit } spinner={ lagrer }>
                    <FormattedMessage id="modal.knapp.lagre" />
                </Knapp>
                <button type="button" className="knapp" onClick={ lukkModal }>
                    <FormattedMessage id="modal.knapp.avbryt" />
                </button>
            </div>
        </form>
    );
}

const RedigerArbeidslisteFormValidation = validForm({
    form: 'arbeidsliste-rediger',
    validate: {
        kommentar: [begrensetKommentarLengde, pakrevdTekst],
        frist: []
    }
})(RedigerArbeidslisteForm);

function oppdaterState(res, arbeidsliste, innloggetVeileder, fnr, lukkModal, dispatch) {
    lukkModal();
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
            frist: formData.frist
        };
        redigerArbeidsliste(arbeidsliste, props.bruker.fnr)(dispatch)
            .then((res) => oppdaterState(res, arbeidsliste, props.innloggetVeileder, props.bruker.fnr, props.lukkModal,
                dispatch));
    }

});

const mapStateToProps = (state: AppState, props: {bruker: BrukerModell}) => ({
    initialValues: {
        kommentar: props.bruker.arbeidsliste.kommentar,
        frist: props.bruker.arbeidsliste.frist
    },
    arbeidslisteStatus: state.arbeidsliste.status
});

export default connect(mapStateToProps, mapDispatchToProps)(RedigerArbeidslisteFormValidation) as any; // todo: fix typing, redux form issues
