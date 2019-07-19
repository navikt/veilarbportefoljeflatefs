import React from 'react';
import Barlabel from './barlabel';


function BarInput({ labelTekst, antall, max, barClassname, ...props }) {
    return (
        <div className="skjema__input">
            <input {...props} />
            <Barlabel
                htmlFor={props.id}
                labelTekst={labelTekst}
                antall={antall}
                max={max}
                className={`${barClassname} skjemaelement__label`}
            />
        </div>
    );
}

export default BarInput;
