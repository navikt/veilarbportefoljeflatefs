import {STATUS} from "../../ducks/utils";
import * as React from "react";
import {ArbeidslisteDataModell, BrukerModell, Status, VeilederModell} from "../../model-interfaces";
import {lagreArbeidsliste} from "../../ducks/arbeidsliste";
import {skjulModal} from "../../ducks/modal";
import {markerAlleBrukere, oppdaterArbeidslisteForBruker} from "../../ducks/portefolje";
import {visServerfeilModal} from "../../ducks/modal-serverfeil";
import {LEGG_TIL_ARBEIDSLISTE_FEILET, visFeiletModal} from "../../ducks/modal-feilmelding-brukere";
import {leggTilStatustall} from "../../ducks/statustall";
import {AppState} from "../../reducer";
import {Form, Formik} from "formik";
import ArbeidslisteForm from "./arbeidsliste-form";
import {connect} from "react-redux";
import {Hovedknapp} from "nav-frontend-knapper";
import {FormattedMessage} from "react-intl";

interface OwnProps {
    valgteBrukere: BrukerModell[];
    lukkModal: () => void;
    innloggetVeileder: VeilederModell;
}

interface StateProps {
    arbeidslisteStatus?: Status;
}

interface DispatchProps {
    onSubmit: (formData, dispatch, props) => void;
}



function LeggTilArbeidslisteForm({ lukkModal, valgteBrukere, innloggetVeileder, arbeidslisteStatus, onSubmit }: OwnProps & StateProps& DispatchProps) {
    const laster = arbeidslisteStatus !== undefined && arbeidslisteStatus !== STATUS.OK;
    const initialValues = valgteBrukere.map(bruker => ({kommentar: '', frist: null, overskrift: '' }));

    return (
        <Formik
            initialValues={{ arbeidsliste: initialValues }}
            onSubmit={values =>
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                }, 500)
            }
            render={({values, handleChange, handleBlur, ...rest}) => {
                return (
                    <Form>
                        <ArbeidslisteForm
                            valgteBrukere={valgteBrukere}
                            arbeidsliste={values.arbeidsliste}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                        />
                        <div>
                            <div className="modal-footer">
                                <Hovedknapp className="knapp knapp--hoved" spinner={laster}>
                                    <FormattedMessage id="modal.knapp.lagre" />
                                </Hovedknapp>
                                <button type="button" className="knapp" onClick={lukkModal}>
                                    <FormattedMessage id="modal.knapp.avbryt" />
                                </button>
                            </div>
                        </div>
                    </Form>
                )

            }}
        />
    );
}


function oppdaterState(res, liste: ArbeidslisteDataModell[], props: {innloggetVeileder: VeilederModell, bruker: BrukerModell}, dispatch) {
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


const mapStateToProps = (state: AppState) => ({
    arbeidslisteStatus: state.arbeidsliste.status
});


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
        dispatch(skjulModal());
        dispatch(markerAlleBrukere(false));
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(LeggTilArbeidslisteForm);
