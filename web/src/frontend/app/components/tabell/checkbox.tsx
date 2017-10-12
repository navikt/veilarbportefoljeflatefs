import * as React from 'react';
import {BrukerModell} from "../../model-interfaces";

interface CheckboxProps {
    bruker: BrukerModell;
    settMarkert: (string, bool) => void;
}

function Checkbox({bruker, settMarkert}: CheckboxProps) {
    return (
        <span className="skjema__input checkboks__wrapper brukerliste--checkbox-margin">
            <input className="checkboks"

                   id={`checkbox-${bruker.fnr}`}
                   type="checkbox"
                   checked={bruker.markert}
                   onClick={() => settMarkert(bruker.fnr, !bruker.markert)}
            />
        <label className="skjemaelement__label" htmlFor={`checkbox-${bruker.fnr}`}/>
        </span>
    );
}

export default Checkbox
