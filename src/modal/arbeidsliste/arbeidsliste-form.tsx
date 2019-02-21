import * as React from "react";
import FormikDatoVelger from "./formik-datovelger";
import {BrukerModell} from "../../model-interfaces";
import {Undertittel} from "nav-frontend-typografi";
import {FormattedMessage} from "react-intl";
import {Input, Textarea as NavFrontendTextarea, Textarea} from "nav-frontend-skjema";

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

function ArbeidslisteForm ({arbeidsliste, valgteBrukere, handleChange, handleBlur}) {
    return(
    <div>
        {arbeidsliste.map((bruker, index) => (
            <div className="input-fields">
                <div className="nav-input blokk-s" key={index}>
                    <legend>
                        {label(valgteBrukere[index])}
                    </legend>
                    <Input
                        id={index}
                        label="Overskrift"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name={`arbeidsliste[${index}].overskrift`}
                        bredde="M"
                    />
                    <Textarea
                        id={index}
                        textareaClass="skjemaelement__input input--fullbredde arbeidslistekommentar"
                        label="Kommentar"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={arbeidsliste[index].kommentar}
                        name={`arbeidsliste[${index}].kommentar`}
                    />
                </div>
                <FormikDatoVelger
                    name={`arbeidsliste[${index}].frist`}
                    id={index}
                />
               </div>
        ))}
        </div>
    )

}


export default ArbeidslisteForm;
