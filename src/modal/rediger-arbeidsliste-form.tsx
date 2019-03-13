import * as React from "react";
import {Form, } from "formik";
import {Hovedknapp} from "nav-frontend-knapper";
import {FormattedMessage} from "react-intl";
import FormikTekstArea from "../components/formik/formik-tekstarea";
import FormikInput from "../components/formik/formik-input";
import FormikDatoVelger from "../components/formik/datovelger/formik-datovelger";
import {Undertekst} from "nav-frontend-typografi";

interface RedigerArbeidslisteProps {
    sistEndretDato: Date;
    sistEndretAv?: string;
    laster: boolean;
    lukkModal: ()=> void;
}


function RedigerArbeidsliste (props: RedigerArbeidslisteProps) {
    return (
        <Form>
            <div className="input-fields">
                <FormikInput name="overskrift"/>
                <FormikTekstArea name ="kommentar"/>
                <Undertekst className="arbeidsliste--modal-redigering">
                    <FormattedMessage
                        id="arbeidsliste.kommentar.footer"
                        values={{
                            dato: props.sistEndretDato.toLocaleDateString(),
                            veileder: props.sistEndretAv
                        }}
                    />
                </Undertekst>
                <FormikDatoVelger name="frist"/>
                <div>
                    <div className="modal-footer">
                        <Hovedknapp htmlType="submit" className="knapp knapp--hoved" spinner={props.laster}>
                            <FormattedMessage id="modal.knapp.lagre" />
                        </Hovedknapp>
                        <button type="button" className="knapp" onClick={props.lukkModal}>
                            <FormattedMessage id="modal.knapp.avbryt" />
                        </button>
                    </div>
                </div>
            </div>
        </Form>
    )
}



export default RedigerArbeidsliste;
