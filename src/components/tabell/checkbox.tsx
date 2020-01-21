import * as React from 'react';
import { BrukerModell } from '../../model-interfaces';
import '../../enhetsportefolje/brukerliste.less';

interface CheckboxProps {
    bruker: BrukerModell;
    settMarkert: (felt: string, markert: boolean) => void;
    className?: string;
}

function Checkbox({bruker, settMarkert, className}: CheckboxProps) {
    return (
        <span className={className + ' flex'}>
            <input className="checkboks"

                   id={`checkbox-${bruker.fnr}`}
                   type="checkbox"
                   checked={bruker.markert}
                   disabled={bruker.fnr === ''}
                   onClick={() => settMarkert(bruker.fnr, !bruker.markert)}
            />
            <label className="skjemaelement__label brukerliste__checkbox" htmlFor={`checkbox-${bruker.fnr}`}/>
        </span>
    );
}

export default Checkbox;
