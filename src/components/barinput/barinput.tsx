import React from 'react';
import Barlabel from './barlabel';


interface BarInputProps {
    skalSkjules: boolean;
    id: unknown;
    type: string;
    className: string;
}

export function BarInput({ skalSkjules, id, type, className, tekstId, antall, max, barClassname, ...props }) {
    if (skalSkjules) {
        return null;
    }
    return (
        <div className="skjema__input">
            <input type={type} id={id} className={className} {...props} />
            <Barlabel
                htmlFor={id}
                tekstId={tekstId}
                antall={antall}
                max={max}
                className={`${barClassname} skjemaelement__label`}
            />
        </div>
    );
}
