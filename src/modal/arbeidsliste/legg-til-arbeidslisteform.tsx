import {STATUS} from "../../ducks/utils";
import * as React from "react";
import {ArbeidslisteDataModell, BrukerModell, Status, VeilederModell} from "../../model-interfaces";
import {postArbeidsliste} from "../../ducks/arbeidsliste";
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
import {skjulModal} from "../../ducks/modal";

interface OwnProps {
    valgteBrukere: BrukerModell[];
    lukkModal: () => void;
    innloggetVeileder: VeilederModell;
    setFormIsDirty: (formIsDirty: boolean)=>void;
}

interface StateProps {
    arbeidslisteStatus?: Status;
}

interface DispatchProps {
    onSubmit: (formData) => void;
}

function LeggTilArbeidslisteForm({ lukkModal, valgteBrukere, innloggetVeileder, arbeidslisteStatus, onSubmit, setFormIsDirty }: OwnProps & StateProps& DispatchProps) {
    const laster = arbeidslisteStatus !== undefined && arbeidslisteStatus !== STATUS.OK;
    const initialValues = valgteBrukere.map(bruker => ({kommentar: '', frist: null, overskrift: '' }));

    return (
        <Formik
            initialValues={{ arbeidsliste: initialValues }}
            onSubmit={(values,actions) => {
                onSubmit(values.arbeidsliste);
                actions.resetForm();
            }}
            render={({values, dirty}) => {
                setFormIsDirty(dirty);
                return (
                    <Form>
                        <ArbeidslisteForm
                            valgteBrukere={valgteBrukere}
                            arbeidsliste={values.arbeidsliste}
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


export function oppdaterState(res, liste: ArbeidslisteDataModell[], props: {innloggetVeileder: VeilederModell, bruker: BrukerModell}, dispatch) {
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


const mapDispatchToProps = (dispatch, props) => ({
    onSubmit: (arbeidsliste) => {
        const {valgteBrukere} = props;
        const liste = arbeidsliste.map((elem, index) => ({
            fnr: valgteBrukere[index].fnr,
            overskrift: elem.overskrift,
            kommentar: elem.kommentar,
            frist: elem.frist
        }));
        return postArbeidsliste(liste)(dispatch)
            .then((data) => {
                console.log('data', data);
                oppdaterState(data, liste, props, dispatch)
            })
            .then(()=> {
                    dispatch(skjulModal());
                    dispatch(markerAlleBrukere(false));
                }
            )
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(LeggTilArbeidslisteForm);
