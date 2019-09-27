import {Checkbox, CheckboxProps} from "nav-frontend-skjema";
import React from "react";
import {FilterstatusSpan} from "./filterstatus-span";

interface CheckBoxMedAntallProps {
    antall: number;
    labelNavn: string
}

export function CheckBoxMedAntall (props: Omit<CheckboxProps & CheckBoxMedAntallProps, "label">) {
    const label = <FilterstatusSpan antall={props.antall} labelNavn={props.labelNavn}/>;
    return (
        <Checkbox
            label={label}
            {...props}
        />
    )
}
