import * as React from 'react';
import {BrukerModell} from "../../model-interfaces";
import * as classnames from 'classnames';

interface CheckboxProps {
    bruker: BrukerModell;
    settMarkert: (string, bool) => void;
    className?: string;
}

function Checkbox({bruker, settMarkert, className}: CheckboxProps) {
    return (
        <span className={classnames("skjema__input", "checkboks__wrapper", "brukerliste--checkbox-margin", className)}>
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
