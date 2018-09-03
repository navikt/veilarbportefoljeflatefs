import * as React from 'react';
import { Knapp } from 'nav-frontend-knapper';
import { connect } from 'react-redux';
import { FieldArray } from 'redux-form';
import { rules, validForm } from 'react-redux-form-validation';
import { FormattedMessage } from 'react-intl';
import { Undertittel } from 'nav-frontend-typografi';
import Datovelger from '../components/datovelger/datovelger';
import Textarea from '../components/textarea/textarea';
import { lagreArbeidsliste } from '../ducks/arbeidsliste';
import { oppdaterArbeidslisteForBruker } from '../ducks/portefolje';
import { leggTilStatustall } from '../ducks/statustall';
import { LEGG_TIL_ARBEIDSLISTE_FEILET, visFeiletModal } from '../ducks/modal-feilmelding-brukere';
import { visServerfeilModal } from '../ducks/modal-serverfeil';
import { STATUS } from '../ducks/utils';
import { AppState } from '../reducer';
import { BrukerModell, VeilederModell, ArbeidslisteDataModell, Status } from '../model-interfaces';
import Input from "../components/input/input";

export const OVERSKRIFT_MAKS_LENGDE = 12;
export const KOMMENTAR_MAKS_LENGDE = 500;

export const begrensetOverskriftLengde = rules.maxLength(
    OVERSKRIFT_MAKS_LENGDE,
    <FormattedMessage
        id="legg-til-arbeidsliste-form.feilmelding.overskrift-lengde"
        values={{ OVERSKRIFT_MAKS_LENGDE }}
    />
);

export const begrensetKommentarLengde = rules.maxLength(
    KOMMENTAR_MAKS_LENGDE,
    <FormattedMessage
        id="legg-til-arbeidsliste-form.feilmelding.kommentar-lengde"
        values={{ KOMMENTAR_MAKS_LENGDE }}
    />
);

export const pakrevdOverskriftTekst = rules.minLength(
    0,
    <FormattedMessage id="legg-til.arbeidsliste-form.feilmelding.overskrift.tekst.mangler" />
);

export const pakrevdTekst = rules.minLength(
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

function renderFelter({ fields }) {
    return (
        <div>
            {fields.map((name, idx) => (
                <fieldset className="input-fields" key={`${name}`}>
                    <div className="nav-input blokk-s">
                        <legend>
                            {label(fields.get(idx))}
                        </legend>

                        <Input
                            feltNavn={`${name}.overskrift`}
                            label="Overskrift/emne"
                            bredde="10px"
                        />

                        <Textarea
                            labelId={`${name}.kommentar`}
                            label="Kommentar"
                            feltNavn={`${name}.kommentar`}
                            placeholder=""
                            maxLength={KOMMENTAR_MAKS_LENGDE}
                            visTellerFra={500}
                        />
                    </div>
                    <Datovelger
                        feltNavn={`${name}.frist`}
                        labelId="arbeidsliste-form.label.dato"
                        label="Frist"
                        tidligsteFom={new Date()}
                        feltErValgfritt
                    />
                </fieldset>
                )
            )}
        </div>);
}

interface LeggTilArbeidslisteFormProps {
    lukkModal: () => void;
    handleSubmit: () => void;
    errorSummary: any;
    arbeidslisteStatus?: Status;
}

function scrollOnFeedbackClick(name) {
    return (event) => {
        event.preventDefault();
        window.location.href = `#${name}`;
        const modalElement = document.getElementsByClassName('arbeidsliste-modal')[0];
        modalElement.scroll(modalElement.scrollLeft, modalElement.scrollTop - 85);
    };
}

function FeedbackElementCreator({name, error}) {
    return (
        <li key={`${name}`}>
            <a onClick={scrollOnFeedbackClick(name)} href={`#${name}`}>{error}</a>
        </li>
    );
}

function LeggTilArbeidslisteForm({ lukkModal, handleSubmit, errorSummary, arbeidslisteStatus }: LeggTilArbeidslisteFormProps) {
    const FieldRenderer = FieldArray as any; // TODO: Finn en bedre løsning
    const laster = arbeidslisteStatus !== undefined && arbeidslisteStatus !== STATUS.OK;
    return (
        <form onSubmit={handleSubmit}>
            {errorSummary}
            <FieldRenderer name="arbeidsliste" component={renderFelter} test={'test'} />
            <div>
                <div className="modal-footer">
                    <Knapp type="hoved" className="knapp knapp--hoved" spinner={laster}>
                        <FormattedMessage id="modal.knapp.lagre" />
                    </Knapp>
                    <button type="button" className="knapp" onClick={lukkModal}>
                        <FormattedMessage id="modal.knapp.avbryt" />
                    </button>
                </div>
            </div>
        </form>
    );
}

export const formNavn = 'arbeidsliste_kommentar_skjema';

const LeggTilArbeidslisteReduxForm = validForm({
    elementCreator: FeedbackElementCreator,
    form: formNavn,
    errorSummaryTitle: (
        <FormattedMessage id="arbeidsliste.form.feiloppsummering.tittel" />
    ),
    validate: {
        arbeidsliste: rules.array('arbeidsliste', {
            overskrift: [begrensetOverskriftLengde, pakrevdOverskriftTekst],
            kommentar: [begrensetKommentarLengde, pakrevdTekst]
        })
    }

})(LeggTilArbeidslisteForm);

const mapStateToProps = (state: AppState, props: {valgteBrukere: BrukerModell[]}) => {
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
        },
        arbeidslisteStatus: state.arbeidsliste.status
    };
};

function oppdaterState(res, liste: ArbeidslisteDataModell[], props: {lukkModal: () => void, innloggetVeileder: VeilederModell, bruker: BrukerModell}, dispatch) {
    props.lukkModal();
    if (!res) {
        return visServerfeilModal()(dispatch);
    }

    const brukereOK = res.data.data;
    const brukereError = res.data.error;

    const arbeidslisteToDispatch = liste
        .map((a) => ({
            ...a,
            sistEndretAv: { veilederId: props.innloggetVeileder },
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
    return oppdaterArbeidslisteForBruker(arbeidslisteToDispatch)(dispatch);
}

const mapDispatchToProps = () => ({
    onSubmit: (formData, dispatch, props) => {
        const liste: ArbeidslisteDataModell[] = formData.arbeidsliste.map((bruker, index) => ({
            fnr: bruker.fnr,
            overskrift: formData.arbeidsliste[index].overskrift,
            kommentar: formData.arbeidsliste[index].kommentar,
            frist: formData.arbeidsliste[index].frist
        }));
        lagreArbeidsliste(liste)(dispatch)
            .then((res) => oppdaterState(res, liste, props, dispatch));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(LeggTilArbeidslisteReduxForm);
