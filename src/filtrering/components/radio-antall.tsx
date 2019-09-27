import {Radio, RadioProps} from "nav-frontend-skjema";
import React from "react";
import {FilterstatusSpan} from "./filterstatus-span";

interface RadioMedAntallProps {
    antall: number;
    labelNavn: string
}

export function RadioMedAntall (props: Omit<Omit<RadioProps & RadioMedAntallProps, "label">, "name">) {
    const label = <FilterstatusSpan antall={props.antall} labelNavn={props.labelNavn}/>;
    return (
        <Radio
            label={label}
            name={props.labelNavn}
            {...props}
        />
    )
}
