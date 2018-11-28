import * as React from 'react';
import { Input as NavInput } from 'nav-frontend-skjema';
import { CustomField } from 'react-redux-form-validation';
import { FormattedMessage } from 'react-intl';

interface InnerInputComponentProps {
    labelId?: string;
    label?: string;
    bredde?: string;
    errorMessage?: any;
    input?: any;
    maxLength?: number;
    placeholder?: string;
}

// eslint-disable-next-line no-unused-vars
function InnerInputComponent({ input, labelId, label, maxLength, errorMessage, ...rest }: InnerInputComponentProps) {
    const feil = errorMessage ? { feilmelding: errorMessage[0] } : undefined;
    const inputProps = { ...input, ...rest };
    const labelCont = labelId ? <FormattedMessage id={labelId} /> : label;
    return (
        <NavInput
            maxLength={maxLength}
            label={labelCont}
            feil={feil}
            {...inputProps}
        />
    );
}

interface InputProps {
    feltNavn: string;
}

function Input({ feltNavn, ...rest }: InputProps & InnerInputComponentProps) {
    return (
        <CustomField
            name={feltNavn}
            errorClass="skjemaelement--harFeil"
            customComponent={<InnerInputComponent {...rest} />}
        />
    );
}

export default Input;
