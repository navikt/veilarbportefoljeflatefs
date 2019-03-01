import * as React from 'react';
import { Field } from 'redux-form'
import { FormattedMessage } from 'react-intl';
import {Textarea as NavFrontendTextarea, TextareaProps } from 'nav-frontend-skjema';

interface TextAreaProps extends TextareaProps {
    labelId: string;
    errorMessage?: any;
    input?: object;
    feltNavn: string;
    visTellerFra?: number;
    validate?: () => void;
    meta?: object;
    label: React.ReactNode | any;
}

function getTellerTekst( antallTegn, maxLength, visTellerFra ) {
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

interface InnerTextareaComponentProps {
    label: React.ReactNode | any;
    labelId: string;
    maxLength?: number;
    errorMessage?: any;
    visTellerFra?: number;
    input?: object;
    meta?: object;
    value: any;
    onChange: (event: React.SyntheticEvent<EventTarget, Event>) => void;
}

function InnerTextAreaComponent({
                                    input,
                                    labelId,
                                    maxLength,
                                    errorMessage,
                                    visTellerFra= 0,
                                    meta,
                                    ...rest
                                }: InnerTextareaComponentProps) {
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

function Textarea({ feltNavn, validate, ...rest }: TextAreaProps) {
    return (
        <Field
            validate={validate}
            name={feltNavn}
            customComponent={<InnerTextAreaComponent label="" {...rest} />}
        />
    );
}

export default Textarea;
