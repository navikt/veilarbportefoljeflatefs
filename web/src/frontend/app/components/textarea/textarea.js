import React from 'react';
import PT from 'prop-types';
import { CustomField } from 'react-redux-form-validation';
import { FormattedMessage } from 'react-intl';
import { Textarea as NavFrontendTextarea } from 'nav-frontend-skjema';

function getTellerTekst(antallTegn, maxLength, visTellerFra) {
    const tegnIgjen = maxLength - antallTegn;
    const tegnForMange = antallTegn - maxLength;
    const tellerFra = visTellerFra || maxLength / 10;

    if (tegnForMange > 0) {
        return (
            <FormattedMessage
                id="tekstfelt.antalltegn.for-mange"
                values={{ antall: `${tegnForMange}` }}
            />
        );
    } else if (tegnIgjen <= tellerFra) {
        return (
            <FormattedMessage
                id="tekstfelt.antalltegn.flere-igjen"
                values={{ antall: `${tegnIgjen}` }}
            />
        );
    }
    return <span>&nbsp;</span>;
}

function InnerTextAreaComponent({
                                    input,
                                    labelId,
                                    maxLength,
                                    errorMessage,
                                    visTellerFra,
                                    meta, // eslint-disable-line no-unused-vars
                                    ...rest
                                }) {
    const feil = errorMessage ? { feilmelding: errorMessage } : undefined;
    return (
        <NavFrontendTextarea
            textareaClass="skjemaelement__input input--fullbredde arbeidslistekommentar"
            label={labelId && <FormattedMessage id={labelId} />}
            maxLength={maxLength}
            feil={feil}
            tellerTekst={(antallTegn) =>
                getTellerTekst(antallTegn, maxLength, visTellerFra)}
            {...input}
            {...rest}
        />
    );
}
InnerTextAreaComponent.propTypes = {
    labelId: PT.string.isRequired,
    maxLength: PT.number.isRequired,
    errorMessage: PT.node,
    visTellerFra: PT.number,
    meta: PT.object, // eslint-disable-line react/forbid-prop-types
    input: PT.object // eslint-disable-line react/forbid-prop-types
};

InnerTextAreaComponent.defaultProps = {
    errorMessage: undefined,
    meta: undefined,
    input: undefined,
    visTellerFra: undefined
};

function Textarea({ feltNavn, validate, ...rest }) {
    return (
        <CustomField
            validate={validate}
            name={feltNavn}
            customComponent={<InnerTextAreaComponent {...rest} />}
        />
    );
}

Textarea.propTypes = {
    feltNavn: PT.string,
    visTellerFra: PT.number,
    validate: PT.func
};

Textarea.defaultProps = {
    feltNavn: undefined,
    visTellerFra: 0
};

export default Textarea;
