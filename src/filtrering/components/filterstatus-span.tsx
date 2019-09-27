import React from "react";

export function FilterstatusSpan (props: {labelNavn: string, antall: number}) {
    return (
        <span className="flex--sb">
            {props.labelNavn}
            <span>
                {props.antall}
            </span>
        </span>
    )
}
