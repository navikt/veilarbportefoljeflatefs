import * as React from 'react';
import { CustomField } from 'react-redux-form-validation';
import { FormattedMessage } from 'react-intl';
import {Textarea as NavFrontendTextarea, TextareaProps } from 'nav-frontend-skjema';

interface TextAreaProps extends TextareaProps {
    labelId: string;
    errorMessage?: any;
    input?: object;
    feltNavn?: string;
    visTellerFra?: number;
    validate?: () => void;
    meta?: object;
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

function Textarea({ feltNavn, validate, ...rest }: any) {
    console.log('..rest', rest);
    return (
        <CustomField
            validate={validate}
            name={feltNavn}
            customComponent={<InnerTextAreaComponent {...rest} />}
        />
    );
}

export default Textarea;
