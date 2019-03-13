import * as React from "react";
import FormikDatoVelger from "../components/formik/datovelger/formik-datovelger";
import {BrukerModell} from "../model-interfaces";
import {Undertittel} from "nav-frontend-typografi";
import {FormattedMessage} from "react-intl";
import {Textarea} from "nav-frontend-skjema";
import FormikInput from "../components/formik/formik-input";
import FormikTekstArea from "../components/formik/formik-tekstarea";

function label(bruker: BrukerModell): React.ReactNode {
    return (<Undertittel><FormattedMessage
        id="modal.legg.til.arbeidsliste.brukerinfo"
        values={{
            etternavn: bruker.etternavn,
            fornavn: bruker.fornavn,
            fnr: bruker.fnr
        }}
    /></Undertittel>);
}

function ArbeidslisteForm ({arbeidsliste, valgteBrukere}) {
    return(
        <div>
            {arbeidsliste.map((bruker, index) => (
                <div className="input-fields">
                    <div className="nav-input blokk-s" key={index}>
                        <legend>
                            {label(valgteBrukere[index])}
                        </legend>
                        <FormikInput name={`arbeidsliste[${index}].overskrift`}/>
                        <FormikTekstArea name = {`arbeidsliste[${index}].kommentar`}/>
                    </div>
                    <FormikDatoVelger name={`arbeidsliste[${index}].frist`}/>
                </div>
            ))}
        </div>
    )

}


export default ArbeidslisteForm;
